const { default: axios } = require("axios");
const router = require("express").Router();

const locationId = "Lisbon"

/* GET home page */
router.get("/", async (req, res, next) => {
  const request = await axios.get(`https://www.triposo.com/api/20210615/poi.json?location_id=${locationId}&count=100&account=XPGSZZCP&token=${process.env.TRIPOSO_TOKEN}`)
  console.log(request.data);
  res.render("index");
});

module.exports = router;
