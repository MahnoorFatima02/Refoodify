require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Recipe = require("./Models/recipe");
const Product = require("./Models/Product");
const User = require("./Models/users");
const connectDB = require("./Models/database");

const seedUsers = async () => {
  const users = [
    {
      firstName: "John",
      lastName: "Doe",
      username: "user1",
      password: await bcrypt.hash("password1", 10), // Hash the password
      role: "user",
      email: "user1@example.com",
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      username: "user2",
      password: await bcrypt.hash("password2", 10), // Hash the password
      role: "user",
      email: "user2@example.com",
    },
    // Add more users as needed
  ];

  await User.deleteMany({});
  await User.insertMany(users);
  console.log("Users seeded");
};

const seedRecipes = async () => {
  const recipes = [
    {
      name: "Spaghetti Bolognese",
      ingredients: [
        { name: "Spaghetti", quantity: "200g" },
        { name: "Ground Beef", quantity: "300g" },
        { name: "Tomato Sauce", quantity: "1 cup" },
      ],
      instructions:
        "Cook spaghetti. Brown the beef. Mix with tomato sauce. Combine with spaghetti.",
      duration: 30,
      serving: 4,
      img: "../../public/foodimage/spaghetti.jpg",
      userId: null, // Will be set later
      author: "Chef John",
      createdAt: new Date().toISOString().split("T")[0],
    },
    {
      name: "Chicken Curry",
      ingredients: [
        { name: "Chicken", quantity: "500g" },
        { name: "Curry Powder", quantity: "2 tbsp" },
        { name: "Coconut Milk", quantity: "1 can" },
      ],
      instructions:
        "Cook chicken. Add curry powder and coconut milk. Simmer until done.",
      duration: 40,
      serving: 4,
      img: "../../public/foodimage/chickencurry.jpg",
      userId: null, // Will be set later
      author: "Chef Jane",
      createdAt: new Date().toISOString().split("T")[0],
    },
    {
      name: "Beef Stew",
      ingredients: [
        { name: "Beef", quantity: "500g" },
        { name: "Potatoes", quantity: "3" },
        { name: "Carrots", quantity: "2" },
      ],
      instructions:
        "Brown beef. Add potatoes and carrots. Simmer until tender.",
      duration: 120,
      serving: 6,
      img: "/foodimage/beefstew.jpg",
      userId: null, // Will be set later
      author: "Chef John",
      createdAt: new Date().toISOString().split("T")[0],
    },
    {
      name: "Vegetable Stir Fry",
      ingredients: [
        { name: "Broccoli", quantity: "1 head" },
        { name: "Bell Peppers", quantity: "2" },
        { name: "Soy Sauce", quantity: "3 tbsp" },
      ],
      instructions: "Stir fry vegetables. Add soy sauce. Serve with rice.",
      duration: 20,
      serving: 4,
      img: "../../public/foodimage/vegetablestir.jpg",
      userId: null, // Will be set later
      author: "Chef Jane",
      createdAt: new Date().toISOString().split("T")[0],
    },
    {
      name: "Pancakes",
      ingredients: [
        { name: "Flour", quantity: "2 cups" },
        { name: "Milk", quantity: "1 cup" },
        { name: "Eggs", quantity: "2" },
      ],
      instructions: "Mix ingredients. Cook on griddle. Serve with syrup.",
      duration: 15,
      serving: 4,
      img: "../../public/foodimage/pancake.jpg",
      userId: null, // Will be set later
      author: "Chef John",
      createdAt: new Date().toISOString().split("T")[0],
    },
    {
      name: "Caesar Salad",
      ingredients: [
        { name: "Romaine Lettuce", quantity: "1 head" },
        { name: "Caesar Dressing", quantity: "1/2 cup" },
        { name: "Croutons", quantity: "1 cup" },
      ],
      instructions: "Toss lettuce with dressing and croutons. Serve chilled.",
      duration: 10,
      serving: 2,
      img: "../../public/foodimage/caesar.jpg",
      userId: null, // Will be set later
      author: "Chef Jane",
      createdAt: new Date().toISOString().split("T")[0],
    },
    {
      name: "Grilled Cheese Sandwich",
      ingredients: [
        { name: "Bread", quantity: "2 slices" },
        { name: "Cheese", quantity: "2 slices" },
        { name: "Butter", quantity: "2 tbsp" },
      ],
      instructions:
        "Butter bread. Place cheese between slices. Grill until golden.",
      duration: 10,
      serving: 1,
      img: "../../public/foodimage/grilledcheese.jpg",
      userId: null, // Will be set later
      author: "Chef John",
      createdAt: new Date().toISOString().split("T")[0],
    },
    {
      name: "Tomato Soup",
      ingredients: [
        { name: "Tomatoes", quantity: "4" },
        { name: "Onion", quantity: "1" },
        { name: "Garlic", quantity: "2 cloves" },
      ],
      instructions:
        "Cook tomatoes, onion, and garlic. Blend until smooth. Serve hot.",
      duration: 30,
      serving: 4,
      img: "../../public/foodimage/tomatosoup.jpg",
      userId: null, // Will be set later
      author: "Chef Jane",
      createdAt: new Date().toISOString().split("T")[0],
    },
    {
      name: "Chocolate Cake",
      ingredients: [
        { name: "Flour", quantity: "2 cups" },
        { name: "Cocoa Powder", quantity: "1 cup" },
        { name: "Sugar", quantity: "1.5 cups" },
      ],
      instructions:
        "Mix ingredients. Bake at 350°F for 30 minutes. Cool and serve.",
      duration: 60,
      serving: 8,
      img: "../../public/foodimage/chococake.jpg",
      userId: null, // Will be set later
      author: "Chef John",
      createdAt: new Date().toISOString().split("T")[0],
    },
    {
      name: "Scrambled Eggs",
      ingredients: [
        { name: "Eggs", quantity: "4" },
        { name: "Milk", quantity: "1/4 cup" },
        { name: "Butter", quantity: "1 tbsp" },
      ],
      instructions: "Whisk eggs and milk. Cook in buttered pan until set.",
      duration: 5,
      serving: 2,
      img: "../../public/foodimage/scramble.jpg",
      userId: null, // Will be set later
      author: "Chef Jane",
      createdAt: new Date().toISOString().split("T")[0],
    },
    {
      name: "Chicken Alfredo",
      ingredients: [
        { name: "Chicken Breast", quantity: "500g" },
        { name: "Fettuccine", quantity: "200g" },
        { name: "Alfredo Sauce", quantity: "1 cup" },
      ],
      instructions: "Cook chicken. Boil fettuccine. Mix with Alfredo sauce.",
      duration: 30,
      serving: 4,
      img: "../../public/foodimage/alfredo.jpg",
      userId: null, // Will be set later
      author: "Chef John",
      createdAt: new Date().toISOString().split("T")[0],
    },
    {
      name: "Fish Tacos",
      ingredients: [
        { name: "Fish Fillets", quantity: "500g" },
        { name: "Tortillas", quantity: "8" },
        { name: "Cabbage", quantity: "1 cup" },
      ],
      instructions: "Cook fish. Assemble tacos with cabbage and tortillas.",
      duration: 20,
      serving: 4,
      img: "../../public/foodimage/fishtaco.jpg",
      userId: null, // Will be set later
      author: "Chef Jane",
      createdAt: new Date().toISOString().split("T")[0],
    },
    {
      name: "Mushroom Risotto",
      ingredients: [
        { name: "Arborio Rice", quantity: "1 cup" },
        { name: "Mushrooms", quantity: "200g" },
        { name: "Parmesan Cheese", quantity: "1/2 cup" },
      ],
      instructions: "Cook rice. Sauté mushrooms. Mix with Parmesan cheese.",
      duration: 45,
      serving: 4,
      img: "../../public/foodimage/risotto.jpg",
      userId: null, // Will be set later
      author: "Chef John",
      createdAt: new Date().toISOString().split("T")[0],
    },
    {
      name: "Lamb Chops",
      ingredients: [
        { name: "Lamb Chops", quantity: "4" },
        { name: "Rosemary", quantity: "2 sprigs" },
        { name: "Garlic", quantity: "2 cloves" },
      ],
      instructions: "Season lamb. Cook with rosemary and garlic.",
      duration: 25,
      serving: 4,
      img: "../../public/foodimage/lambchops.jpg",
      userId: null, // Will be set later
      author: "Chef Jane",
      createdAt: new Date().toISOString().split("T")[0],
    },
    {
      name: "Apple Pie",
      ingredients: [
        { name: "Apples", quantity: "6" },
        { name: "Pie Crust", quantity: "1" },
        { name: "Cinnamon", quantity: "1 tsp" },
      ],
      instructions: "Prepare apples. Fill pie crust. Bake until golden.",
      duration: 90,
      serving: 8,
      img: "../../public/foodimage/applepie.jpg",
      userId: null, // Will be set later
      author: "Chef John",
      createdAt: new Date().toISOString().split("T")[0],
    },
    {
      name: "Greek Salad",
      ingredients: [
        { name: "Cucumber", quantity: "1" },
        { name: "Tomatoes", quantity: "2" },
        { name: "Feta Cheese", quantity: "1/2 cup" },
      ],
      instructions: "Chop vegetables. Mix with feta cheese and dressing.",
      duration: 15,
      serving: 4,
      img: "../../public/foodimage/greeksalad.jpg",
      userId: null, // Will be set later
      author: "Chef Jane",
      createdAt: new Date().toISOString().split("T")[0],
    },
  ];

  // Assign userId to each recipe
  const users = await User.find({});
  recipes.forEach((recipe, index) => {
    recipe.userId = users[index % users.length]._id;
  });

  await Recipe.deleteMany({});
  await Recipe.insertMany(recipes);
  console.log("Recipes seeded");
};

const seedProducts = async () => {
  const products = [
    {
      name: "Orange",
      price: 2.5,
      discountedPrice: 2.1,
      store: "Prisma",
      location: "Aisle 3",
      img: "../../../public/images/orange.jpg",
    },
    {
      name: "Apple",
      price: 1.5,
      discountedPrice: 1.2,
      store: "K-Market",
      location: "Aisle 1",
      img: "../../../public/images/apple.png",
    },
    {
      name: "Banana",
      price: 1.2,
      discountedPrice: 1.0,
      store: "Lidl",
      location: "Aisle 2",
      img: "../../../public/images/banana.png",
    },
    {
      name: "Grapes",
      price: 3.0,
      discountedPrice: 2.5,
      store: "S-Market",
      location: "Aisle 4",
      img: "../../../public/images/grape.jpg",
    },
    {
      name: "Milk",
      price: 1.0,
      discountedPrice: 0.8,
      store: "Prisma",
      location: "Aisle 5",
      img: "../../../public/images/milk.jpg",
    },
    {
      name: "Bread",
      price: 2.0,
      discountedPrice: 1.5,
      store: "K-Market",
      location: "Aisle 6",
      img: "../../../public/images/bread.jpg",
    },
    {
      name: "Butter",
      price: 1.5,
      discountedPrice: 1.2,
      store: "Lidl",
      location: "Aisle 7",
      img: "../../../public/images/butter.jpg",
    },
    {
      name: "Cheese",
      price: 2.5,
      discountedPrice: 2.0,
      store: "S-Market",
      location: "Aisle 8",
      img: "../../../public/images/cheese.png",
    },
    {
      name: "Yogurt",
      price: 1.0,
      discountedPrice: 0.9,
      store: "Prisma",
      location: "Aisle 9",
      img: "../../../public/images/yogurt.jpg",
    },
    {
      name: "Chicken",
      price: 5.0,
      discountedPrice: 4.5,
      store: "K-Market",
      location: "Aisle 10",
      img: "../../../public/images/chicken.jpg",
    },
    {
      name: "Beef",
      price: 7.0,
      discountedPrice: 6.0,
      store: "Lidl",
      location: "Aisle 11",
      img: "../../../public/images/beef.jpg",
    },
    {
      name: "Fish",
      price: 6.0,
      discountedPrice: 5.0,
      store: "S-Market",
      location: "Aisle 12",
      img: "../../../public/images/fish.jpg",
    },
    {
      name: "Rice",
      price: 1.5,
      discountedPrice: 1.2,
      store: "Prisma",
      location: "Aisle 13",
      img: "../../../public/images/rice.jpg",
    },
    {
      name: "Pasta",
      price: 1.2,
      discountedPrice: 1.0,
      store: "K-Market",
      location: "Aisle 14",
      img: "../../../public/images/pasta.jpg",
    },
    {
      name: "Tomato Sauce",
      price: 1.0,
      discountedPrice: 0.8,
      store: "Lidl",
      location: "Aisle 15",
      img: "/images/tomatosauce.jpg",
    },
    {
      name: "Spinach",
      price: 2.0,
      discountedPrice: 1.8,
      store: "S-Market",
      location: "Aisle 16",
      img: "../../../public/images/spinach.jpg",
    },
    {
      name: "Avocado",
      price: 1.8,
      discountedPrice: 1.5,
      store: "Prisma",
      location: "Aisle 17",
      img: "../../../public/images/avocado.jpg",
    },
    {
      name: "Olive Oil",
      price: 5.0,
      discountedPrice: 4.5,
      store: "K-Market",
      location: "Aisle 18",
      img: "../../../public/images/oliveoil.jpg",
    },
    {
      name: "Salmon",
      price: 8.0,
      discountedPrice: 7.0,
      store: "Lidl",
      location: "Aisle 19",
      img: "../../../public/images/salmon.jpg",
    },
    {
      name: "Quinoa",
      price: 3.5,
      discountedPrice: 3.0,
      store: "S-Market",
      location: "Aisle 20",
      img: "../../../public/images/quinoa.jpg",
    },
    {
      name: "Almond Milk",
      price: 2.5,
      discountedPrice: 2.2,
      store: "Prisma",
      location: "Aisle 21",
      img: "../../../public/images/almondmilk.jpg",
    },
    {
      name: "Tofu",
      price: 2.0,
      discountedPrice: 1.8,
      store: "K-Market",
      location: "Aisle 22",
      img: "../../../public/images/tofu.jpg",
    },
    {
      name: "Honey",
      price: 4.0,
      discountedPrice: 3.5,
      store: "Lidl",
      location: "Aisle 23",
      img: "../../../public/images/honey.jpg",
    },
    {
      name: "Greek Yogurt",
      price: 3.0,
      discountedPrice: 2.7,
      store: "S-Market",
      location: "Aisle 24",
      img: "../../../public/images/greekyogurt.jpeg",
    },
    {
      name: "Almonds",
      price: 5.5,
      discountedPrice: 5.0,
      store: "Prisma",
      location: "Aisle 25",
      img: "../../../public/images/almonds.jpg",
    },
  ];

  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log("Products seeded");
};

const seedDatabase = async () => {
  await connectDB();
  await seedUsers();
  await seedRecipes();
  await seedProducts();
  mongoose.connection.close();
};

seedDatabase().catch((err) => {
  console.error("Seeding error:", err);
  mongoose.connection.close();
});
