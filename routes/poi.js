const router = require("express").Router();
const { default: axios } = require("axios");

router.get("/poi-detail/:id", async (req, res) => {
    const request = await axios.get(`https://www.triposo.com/api/20210615/poi.json?id=${req.params.id}&count=10&account=${process.env.TRIPOSO_ACCOUNT}&token=${process.env.TRIPOSO_TOKEN}`)
    const place = request.data.results[0]
    console.log("the place", place)
    res.render("poi/poi-detail", place);
});

module.exports = router;







