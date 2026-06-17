const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../data/foods.json");

// Function to read JSON file
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

// Function to write JSON file
const writeJSONFile = async (data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

// Get all foods
const getFoods = async () => {
  return await readJSONFile();
};

// Get food by ID
const getFoodById = async (id) => {
  const foods = await getFoods();
  return foods.find((food) => food.id === id) || null;
};

// Create a new food
const createFood = async (food) => {
  const foods = await getFoods();
  foods.push(food);
  await writeJSONFile(foods);
  return food;
};

// Update food
const updateFood = async (id, updatedFood) => {
  const foods = await getFoods();
  const index = foods.findIndex((food) => food.id === id);
  if (index === -1) return null;

  foods[index] = { ...foods[index], ...updatedFood };
  await writeJSONFile(foods);
  return foods[index];
};

// Delete food
const deleteFood = async (id) => {
  const foods = await getFoods();
  const filteredFoods = foods.filter((food) => food.id !== id);
  if (foods.length === filteredFoods.length) return false;

  await writeJSONFile(filteredFoods);
  return true;
};

module.exports = {
  getFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
};
