const KEYS = {
  foods: 'ft-foods',
  users: 'ft-users',
}

let online = true
const listeners = new Set()
const notify = () => listeners.forEach((fn) => fn(online))

export function onStatusChange(fn) {
  listeners.add(fn)
  fn(online)
  return () => listeners.delete(fn)
}

const genId = () => crypto.randomUUID()

// ── localStorage helpers ──

const local = {
  read(key) {
    try {
      return JSON.parse(localStorage.getItem(key)) || []
    } catch {
      return []
    }
  },
  write(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
  },

  getFoods() { return this.read(KEYS.foods) },
  setFoods(v) { this.write(KEYS.foods, v) },
  getUsers() { return this.read(KEYS.users) },
  setUsers(v) { this.write(KEYS.users, v) },

  createFood(food) {
    const foods = this.getFoods()
    const item = { ...food, id: genId() }
    foods.push(item)
    this.setFoods(foods)
    return item
  },

  getFoodById(id) {
    return this.getFoods().find((f) => f.id === id) || null
  },

  updateFood(id, updates) {
    const foods = this.getFoods()
    const idx = foods.findIndex((f) => f.id === id)
    if (idx === -1) return null
    foods[idx] = { ...foods[idx], ...updates }
    this.setFoods(foods)
    return foods[idx]
  },

  deleteFood(id) {
    const foods = this.getFoods()
    const filtered = foods.filter((f) => f.id !== id)
    if (foods.length === filtered.length) return false
    this.setFoods(filtered)
    return true
  },

  createUser(user) {
    const users = this.getUsers()
    users.push(user)
    this.setUsers(users)
    return user
  },
}

// ── backend-or-fallback ──

async function tryFetch(url, options) {
  const res = await fetch(url, options)
  if (!res.ok) throw new Error(`${res.status}`)
  return res
}

function fallback(err, localFn) {
  if (online !== false) {
    online = false
    notify()
  }
  console.warn('Backend unavailable, using local storage:', err.message)
  return localFn()
}

function backendOk() {
  if (online !== true) {
    online = true
    notify()
  }
}

// ── API ──

export const api = {
  async getFoods() {
    try {
      const res = await tryFetch('/foods/')
      const data = await res.json()
      backendOk()
      return data
    } catch (err) {
      return fallback(err, () => local.getFoods())
    }
  },

  async createFood(food) {
    try {
      const res = await tryFetch('/foods/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(food),
      })
      backendOk()
      return await res.json()
    } catch (err) {
      return fallback(err, () => local.createFood(food))
    }
  },

  async getFoodById(id) {
    try {
      const res = await tryFetch(`/foods/${id}`)
      const data = await res.json()
      backendOk()
      return data
    } catch (err) {
      return fallback(err, () => local.getFoodById(id))
    }
  },

  async updateFood(id, updates) {
    try {
      const res = await tryFetch(`/foods/update/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      backendOk()
      return await res.json()
    } catch (err) {
      return fallback(err, () => local.updateFood(id, updates))
    }
  },

  async deleteFood(id) {
    try {
      await tryFetch(`/foods/${id}`, { method: 'DELETE' })
      backendOk()
    } catch (err) {
      fallback(err, () => local.deleteFood(id))
    }
  },

  async getUsers() {
    try {
      const res = await tryFetch('/users/')
      const data = await res.json()
      backendOk()
      return data
    } catch (err) {
      return fallback(err, () => local.getUsers())
    }
  },

  async createUser(user) {
    try {
      const res = await tryFetch('/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      })
      backendOk()
      return await res.json()
    } catch (err) {
      return fallback(err, () => local.createUser(user))
    }
  },
}
