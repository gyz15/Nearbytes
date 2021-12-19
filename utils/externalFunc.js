const axios = require("axios").default;
const API_KEY = "<YOUR_API_KEY_HERE>";
const { checkIsVegan, checkHasSeafood } = require("./checkRestaurant");

const findSupermarketInCity = async (args, conv) => {
  const { userLat, userLon } = args;
  const superMarketResult = await axios.get(
    "https://api.geoapify.com/v2/places",
    {
      params: {
        categories: "commercial.supermarket",
        filter: `circle:${userLon},${userLat},10000`,
        bias: `proximity:${userLon},${userLat}`,
        limit: 100,
        apiKey: API_KEY,
      },
    }
  );
  let cleanedSupermarketList = [];
  for (let i = 0; i < superMarketResult.data.features.length; i++) {
    let supermarket = superMarketResult.data.features[i];
    if (supermarket.properties.name) {
      //We don't want to include supermarkets that don't have a name (which crashes the app)
      cleanedSupermarketList.push({
        name: supermarket.properties.name,
        street: supermarket.properties.street,
        detail_addr: supermarket.properties.formatted,
        ratings: (Math.floor(Math.random() * 10 * 10) / 10).toString(), //We generate a random ratings between 0.0-10.0 as the api doesn't include it. (for demo only)
        distance_away: calculateDistance(supermarket.properties.distance),
      });
    }
  }
  return cleanedSupermarketList;
};

const filterNoSeafood = async (args, conv) => {
  let noSeafoodRestaurantResults = args.results.filter(
    (restaurant) => !restaurant.hasSeafood
  );
  return noSeafoodRestaurantResults;
};

const filterVegan = async (args, conv) => {
  let veganRestaurantResults = args.results.filter(
    (restaurant) => restaurant.isVegan
  );
  return veganRestaurantResults;
};

const recommend = async (args, conv) => {
  const resultArr = args.resultArr;
  if (resultArr.length > 0) {
    let recommendation = resultArr.splice(
      Math.floor(Math.random() * resultArr.length),
      1
    )[0];
    console.log(recommendation);
    let name = recommendation.name;
    let street = recommendation.street;
    let ratings = recommendation.ratings;
    let distance_away = recommendation.distance_away;

    return {
      remainingRestaurant: resultArr,
      name: name,
      street: street,
      ratings: ratings,
      distance_away: distance_away,
      hasOther: resultArr.length > 0,
      ableToRecommend: true,
    };
  } else {
    return {
      remainingRestaurant: resultArr,
      name: "",
      street: "",
      ratings: "",
      distance_away: "",
      hasOther: false,
      ableToRecommend: false,
    };
  }
};

const findRestaurantInCity = async (args, conv) => {
  const { userLat, userLon } = args;
  const restResult = await axios.get("https://api.geoapify.com/v2/places", {
    params: {
      categories: "catering.restaurant",
      filter: `circle:${userLon},${userLat},10000`,
      bias: `proximity:${userLon},${userLat}`,
      limit: 100,
      apiKey: API_KEY,
    },
  });
  let cleanedRestaruantList = [];
  for (let i = 0; i < restResult.data.features.length; i++) {
    let restaurant = restResult.data.features[i];
    cleanedRestaruantList.push({
      name: restaurant.properties.name,
      street: restaurant.properties.street,
      detail_addr: restaurant.properties.formatted,
      isVegan: checkIsVegan(restaurant),
      hasSeafood: checkHasSeafood(restaurant),
      ratings: (Math.floor(Math.random() * 10 * 10) / 10).toString(), //We generate a random ratings between 0.0-10.0 as the api doesn't include it. (for demo only)
      distance_away: calculateDistance(restaurant.properties.distance),
    });
  }
  return cleanedRestaruantList;
};

const findHotelInCity = async (args, conv) => {
  const { userLat, userLon } = args;
  const hotelResult = await axios.get("https://api.geoapify.com/v2/places", {
    params: {
      categories: "accommodation",
      filter: `circle:${userLon},${userLat},10000`,
      bias: `proximity:${userLon},${userLat}`,
      limit: 100,
      apiKey: API_KEY,
    },
  });
  let cleanedHotelList = [];
  for (let i = 0; i < hotelResult.data.features.length; i++) {
    let hotel = hotelResult.data.features[i];
    cleanedHotelList.push({
      name: hotel.properties.name,
      street: hotel.properties.street,
      detail_addr: hotel.properties.formatted,
      ratings: (Math.floor(Math.random() * 10 * 10) / 10).toString(), //We generate a random ratings between 0.0-10.0 as the api doesn't include it. (for demo only)
      distance_away: calculateDistance(hotel.properties.distance),
    });
  }
  return cleanedHotelList;
};

const findLoc = async (args, conv) => {
  const city = args.userLoc;
  const res = await axios.get(`https://api.geoapify.com/v1/geocode/search`, {
    params: {
      text: city,
      format: "json",
      apiKey: API_KEY,
    },
  });
  // console.log(res);
  if (res.data.results.length > 0) {
    let result = res.data.results[0];
    // console.log(result);
    let state = result.state;
    let country = result.country;
    return {
      speech: `I think I have found your location, is the location${
        state ? ` at ${state}` : ""
      } in ${country}?`,
      lat: result.lat.toString(),
      lon: result.lon.toString(),
    };
  } else {
    return {
      speech: `I'm sorry I could not find you location, please try again`,
      lat: "",
      lon: "",
    };
  }
};

const calculateDistance = (metres) => {
  if (metres < 1000) {
    return `${metres} metres`;
  } else {
    return `${(metres / 1000).toFixed(2)} km`;
  }
};
module.exports = {
  findSupermarketInCity,
  filterNoSeafood,
  filterVegan,
  recommend,
  findRestaurantInCity,
  findHotelInCity,
  findLoc,
};
