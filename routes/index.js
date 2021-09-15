const router = require("express").Router();
const { default: axios } = require("axios");
const Plan = require("../models/Plan.model");

// /* GET home page */
// router.get("/", async (req, res, next) => {
//   res.render("index");
// });

module.exports = router;

router.get("/search-location", async (req, res) => {
  const locationId = req.query.searchLocation
  const request = await axios.get(`https://www.triposo.com/api/20210615/poi.json?location_id=${locationId}&count=10&account=${process.env.TRIPOSO_ACCOUNT}&token=${process.env.TRIPOSO_TOKEN}`)
  const listOfPlaces = request.data.results;
  res.render("poi/list-of-locations", {listOfPlaces});
});

router.get("/", async (req, res) => {
  console.log("home")
  const request = await axios.get(`https://www.triposo.com/api/20210615/poi.json?order_by=-score&count=3&account=${process.env.TRIPOSO_ACCOUNT}&token=${process.env.TRIPOSO_TOKEN}`)  
  const listOfPlaces = request.data.results;
  console.log(listOfPlaces[0].images);
  res.render("index", {listOfPlaces});
});


// router.get("/", async (req, res) => {
//   console.log("home")
//   const request = await axios.get(`https://www.triposo.com/api/20210615/poi.json?order_by=-score&count=3&account=${process.env.TRIPOSO_ACCOUNT}&token=${process.env.TRIPOSO_TOKEN}`)  
//   const listOfPlaces = request.data.results;
//   console.log(listOfPlaces[0].images);
//   res.render("index", {listOfPlaces});
// });



// const request = await axios.get(`https://www.triposo.com/api/20210615/poi.json?id=${req.params.id}&count=10&account=${process.env.TRIPOSO_ACCOUNT}&token=${process.env.TRIPOSO_TOKEN}`)
//     const place = request.data.results[0]
//     console.log("the place", place)
//     res.render("poi/poi-detail", place);