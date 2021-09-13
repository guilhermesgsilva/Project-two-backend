const router = require("express").Router();
const { default: axios } = require("axios");

// API FUNCTION

let placeId = "";

 function request() {
    return axios.get(`https://www.triposo.com/api/20210615/poi.json?id=${placeId}&count=10&account=${process.env.TRIPOSO_ACCOUNT}&token=${process.env.TRIPOSO_TOKEN}`)
}

//DETAIL
router.get("/poi-detail/:id", async (req, res) => {
    placeId = req.params.id;
    const response = await request();
    const place = response.data.results[0];
    console.log(place);
    res.render("poi/poi-detail", place);
});

module.exports = router;