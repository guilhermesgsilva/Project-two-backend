const router = require("express").Router();
const { default: axios } = require("axios");

const locationId = "Lisbon"

// LIST
router.get("/profile", (req, res) => {
    res.render("plan/profile-plan-list");
});

// CREATE
router.get("/create-plan", async (req, res) => {
    try{const request = await axios.get(`https://www.triposo.com/api/20210615/poi.json?location_id=${locationId}&count=10&account=${process.env.TRIPOSO_ACCOUNT}&token=${process.env.TRIPOSO_TOKEN}`)
    const listOfPlaces = request.data.results
    console.log(listOfPlaces)
    res.render("plan/plan-create", {listOfPlaces});}
    catch(e){
        console.log(e)
    }
});

router.post("/create-plan", (req, res) => {
    res.redirect("/profile");
});

// EDIT
router.get("/edit-plan", (req, res) => {
    res.render("plan/plan-edit");
});

module.exports = router;
