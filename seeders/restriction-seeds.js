const { Restriction } = require("../models");

const restrictionData = [
  {
    restriction_name: "Eggs",
    category: "Allergies"
  },
  {
    restriction_name: "Fish",
    category: "Allergies"
  },
  {
    restriction_name: "Gluten",
    category: "Allergies"
  },
  {
    restriction_name: "Peanuts",
    category: "Allergies"
  },
  {
    restriction_name: "Shellfish",
    category: "Allergies"
  },
  {
    restriction_name: "Soy",
    category: "Allergies"
  },
  {
    restriction_name: "Tree Nuts",
    category: "Allergies"
  },
  {
    restriction_name: "Wheat",
    category: "Allergies"
  },
  {
    restriction_name: "Celiac Disease: Gluten Free",
    category: "Medical"
  },
  {
    restriction_name: "Diabetes: Sugar Free",
    category: "Medical"
  },
  {
    restriction_name: "Gout: High Vegetables & Low Meat",
    category: "Medical"
  },
  {
    restriction_name: "Hypertension: Low Salt",
    category: "Medical"
  },
  {
    restriction_name: "Lactose Intolerance: Dairy Free",
    category: "Medical"
  },
  {
    restriction_name: "Buddhist: No Meat, Garlic, Onions",
    category: "Religious"
  },
  {
    restriction_name: "Hindu: No Beef, Eggs",
    category: "Religious"
  },
  {
    restriction_name: "Jewish: Kosher",
    category: "Religious"
  },
  {
    restriction_name: "Muslim: Halal",
    category: "Religious"
  },
  {
    restriction_name: "Alcohol Free",
    category: "Substance"
  },
  {
    restriction_name: "Caffeine Free",
    category: "Substance"
  },
  {
    restriction_name: "Atkins",
    category: "Weight Management"
  },
  {
    restriction_name: "Keto",
    category: "Weight Management"
  },
  {
    restriction_name: "Low Carb",
    category: "Weight Management"
  },
  {
    restriction_name: "Low Fat",
    category: "Weight Management"
  },
  {
    restriction_name: "Paleo",
    category: "Weight Management"
  },
  {
    restriction_name: "Pescetarian",
    category: "Other"
  },
  {
    restriction_name: "Vegan",
    category: "Other"
  },
  {
    restriction_name: "Vegetarian",
    category: "Other"
  }
];

const seedRestrictions = () => Restriction.bulkCreate(restrictionData);

module.exports = seedRestrictions;
