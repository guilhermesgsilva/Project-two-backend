const router = require("express").Router();
const { default: axios } = require("axios");
const Plan = require("../models/Plan.model");

// LIST
router.get("/profile", async (req, res) => {
    const plans = await Plan.find();
    res.render("plan/profile-plan-list", {plans});
});

// CREATE
router.post("/create-plan", async (req, res) => {
    const {planName} = req.body;
    await Plan.create({planName});
    res.redirect("/profile");
});

router.get("/search-location", async (req, res) => {
    const locationId = req.query.searchLocation
    const request = await axios.get(`https://www.triposo.com/api/20210615/poi.json?location_id=${locationId}&count=10&account=${process.env.TRIPOSO_ACCOUNT}&token=${process.env.TRIPOSO_TOKEN}`)
    const listOfPlaces = request.data.results;
    res.render("plan/plan-edit", {listOfPlaces});
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
router.get("/profile/:planId/edit", async (req, res) => {
    const plan = await Plan.findById(req.params.planId);
    res.render("plan/plan-edit", plan);
});

// DELETE
router.post("/profile/:planId/delete", async (req, res) => {
    await Plan.findByIdAndDelete(req.params.planId);
    res.redirect("/profile");
})

module.exports = router;
