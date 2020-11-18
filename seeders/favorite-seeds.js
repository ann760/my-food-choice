const { Favorite } = require("../models");

const favoriteData = [
  {
    food_name: "Coca Cola",
    food_category: "Beverage"
  },
  {
    food_name: "Lemonade",
    food_category: "Beverage"
  },
  {
    food_name: "Orange Juice",
    food_category: "Beverage"
  },
  {
    food_name: "Pepsi",
    food_category: "Beverage"
  },
  {
    food_name: "Banana Split",
    food_category: "Dessert"
  },
  {
    food_name: "Brownie",
    food_category: "Dessert"
  },
  {
    food_name: "Fruit Salad",
    food_category: "Dessert"
  },
  {
    food_name: "Gulab Jamoon",
    food_category: "Dessert"
  },
  {
    food_name: "Ice cream",
    food_category: "Dessert"
  },
  {
    food_name: "Caesar Salad",
    food_category: "Entree"
  },
  {
    food_name: "Chicken Alfredo Pasta",
    food_category: "Entree"
  },
  {
    food_name: "Cheese Burger",
    food_category: "Entree"
  },
  {
    food_name: "Chicken Burgers",
    food_category: "Entree"
  },
  {
    food_name: "Chicken Tikka masala",
    food_category: "Entree"
  },
  {
    food_name: "Egg Benedict",
    food_category: "Entree"
  },
  {
    food_name: "Gluten Free Pizza",
    food_category: "Entree"
  },
  {
    food_name: "Grilled Cheese Sandwich",
    food_category: "Entree"
  },
  {
    food_name: "Grilled Fish",
    food_category: "Entree"
  },
  {
    food_name: "Shrimp Biriyani",
    food_category: "Entree"
  },
  {
    food_name: "Spaghetti in Marinara sauce",
    food_category: "Entree"
  },
  {
    food_name: "Sushi",
    food_category: "Entree"
  },
  {
    food_name: "Thai red curry",
    food_category: "Entree"
  },
  {
    food_name: "Thai yellow curry",
    food_category: "Entree"
  },
  {
    food_name: "Vegetable Korma",
    food_category: "Entree"
  },
  {
    food_name: "Vegetable Sizzler",
    food_category: "Entree"
  },
  {
    food_name: "Veggie Omelette",
    food_category: "Entree"
  },
  {
    food_name: "Brown Rice",
    food_category: "Sides"
  },
  {
    food_name: "Boiled Corn",
    food_category: "Sides"
  },
  {
    food_name: "Brussel Sprouts",
    food_category: "Sides"
  },
  {
    food_name: "Curly Fries",
    food_category: "Sides"
  },
  {
    food_name: "Fries",
    food_category: "Sides"
  },
  {
    food_name: "Riced cauliflower",
    food_category: "Sides"
  },
  {
    food_name: "Stir Fried Veggies",
    food_category: "Sides"
  },
  {
    food_name: "White Rice",
    food_category: "Sides"
  }
];

const seedFavFood = () => Favorite.bulkCreate(favoriteData);

module.exports = seedFavFood;
