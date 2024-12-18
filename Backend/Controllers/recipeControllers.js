const {
  createRecipe,
  updateRecipe,
  getRecipeById,
  getUserRecipes,
  filterRecipes,
  deleteRecipe,
  getAllRecipes,
} = require("../Services/recipeService");

const getAllRecipesController = async (req, res) => {
  try {
    const recipes = await getAllRecipes();
    res.status(200).json(recipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Handler for searching recipes by ingredients
const filterRecipesController = async (req, res) => {
  const { ingredients } = req.body;

  try {
    const recipes = await filterRecipes(ingredients);
    res.status(200).json(recipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Handler for creating a new recipe
const createRecipeController = async (req, res) => {
  const userId = req.user.id;
  const author = req.user.username; // Assuming the user's name is stored in req.user.name
  const recipeData = req.body;

  try {
    const recipe = await createRecipe(recipeData, userId, author);
    res.status(201).json(recipe);
  } catch (err) {
       if (err.message.includes("required")) {
         res.status(400).json({ error: err.message });
       } else {
         res.status(500).send("Server error");
       }
  }
};

// Handler for fetching all recipes of a user
const getUserRecipesController = async (req, res) => {
  const userId = req.user.id; // Get user ID from the authenticated user

  try {
    const recipes = await getUserRecipes(userId);
    res.status(200).json(recipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Handler for fetching a recipe by ID
const getRecipeByIdController = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const recipe = await getRecipeById(id, userId);
    res.status(200).json(recipe);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Handler for updating a recipe
const updateRecipeController = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const updateData = req.body;

  try {
    const message = await updateRecipe(id, userId, updateData);
    res.status(200).send(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Handler for deleting a recipe
const deleteRecipeController = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const message = await deleteRecipe(id, userId);
    res.status(200).send(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  createRecipeController,
  updateRecipeController,
  getRecipeByIdController,
  getUserRecipesController,
  filterRecipesController,
  deleteRecipeController,
  getAllRecipesController,
};
