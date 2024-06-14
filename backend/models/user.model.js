const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../data/users.json");

const readJSONFile = async () => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    } else {
      throw error;
    }
  }
};

const writeJSONFile = async (data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

const validateUsername = (username) => {
  return typeof username === "string" && username.trim().length >= 3;
};

const getUsers = async () => {
  return await readJSONFile();
};

const getUserByUsername = async (username) => {
  const users = await getUsers();
  return users.find((user) => user.username === username) || null;
};

const createUser = async (user) => {
  if (!validateUsername(user.username)) {
    throw new Error("Username must be a string with at least 3 characters");
  }

  const users = await getUsers();
  if (users.some((existingUser) => existingUser.username === user.username)) {
    throw new Error("Username already exists");
  }

  users.push(user);
  await writeJSONFile(users);
  return user;
};

const updateUser = async (username, updatedUser) => {
  const users = await getUsers();
  const index = users.findIndex((user) => user.username === username);
  if (index === -1) return null;

  if (updatedUser.username && !validateUsername(updatedUser.username)) {
    throw new Error("Username must be a string with at least 3 characters");
  }

  users[index] = { ...users[index], ...updatedUser };
  await writeJSONFile(users);
  return users[index];
};

const deleteUser = async (username) => {
  const users = await getUsers();
  const filteredUsers = users.filter((user) => user.username !== username);
  if (users.length === filteredUsers.length) return false;

  await writeJSONFile(filteredUsers);
  return true;
};

module.exports = {
  getUsers,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser,
};
