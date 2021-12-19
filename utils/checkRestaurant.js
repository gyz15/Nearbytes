const checkIsVegan = (restaurant) => {
  let categories = restaurant.properties.categories;
  return (
    categories.indexOf("vegan") > -1 ||
    categories.indexOf("vegan.only") > -1 ||
    categories.indexOf("vegetarian.only") > -1 ||
    categories.indexOf("vegetarian") > -1
  );
};

const checkHasSeafood = (restaurant) => {
  let categories = restaurant.properties.categories;
  return (
    categories.indexOf("catering.restaurant.seafood") > -1 ||
    categories.indexOf("catering.restaurant.fish_and_chips") > -1 ||
    categories.indexOf("catering.restaurant.fish") > -1 ||
    categories.indexOf("catering.fast_food.fish_and_chips") > -1 ||
    categories.indexOf("commercial.food_and_drink.seafood") > -1
  );
};

module.exports = { checkIsVegan, checkHasSeafood };
