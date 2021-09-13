const router = require("express").Router();
const { default: axios } = require("axios");

// LIST
router.get("/profile", (req, res) => {
    res.render("plan/profile-plan-list");
});

// CREATE
router.get("/create-plan", async (req, res) => {
    res.render("plan/plan-create");
});

router.post("/create-plan", (req, res) => {
});

router.post("/discard-plan", (req, res) => {
    res.redirect("/profile");
});

router.get("/search-location", async (req, res) => {
    const locationId = req.query.searchLocation
    const request = await axios.get(`https://www.triposo.com/api/20210615/poi.json?location_id=${locationId}&count=10&account=${process.env.TRIPOSO_ACCOUNT}&token=${process.env.TRIPOSO_TOKEN}`)
    const listOfPlaces = request.data.results;
    res.render("plan/plan-create", {listOfPlaces});
});

router.post("/add-day", (req, res) => {
});

router.post("/delete-day", (req, res) => {
});

router.post("/add-item", (req, res) => { 
});

router.post("/delete-item", (req, res) => { 
});

// EDIT
router.get("/edit-plan", (req, res) => {
    res.render("plan/plan-edit");
});

module.exports = router;
