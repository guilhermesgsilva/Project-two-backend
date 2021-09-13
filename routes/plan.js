const router = require("express").Router();
const { default: axios } = require("axios");
const locationId = "Lisbon"

router.get("/profile", (req, res) => {
    res.render("plan/profile-plan-list");
});



router.get("/create-plan", async (req, res) => {
    const request = await axios.get(`https://www.triposo.com/api/20210615/poi.json?location_id=${locationId}&count=10&account=${process.env.TRIPOSO_ACCOUNT}&token=${process.env.TRIPOSO_TOKEN}`)
    const listOfPlaces = request.data.results
    console.log(listOfPlaces)
    res.render("plan/plan-create", {listOfPlaces});
});

router.post("/create-plan", (req, res) => {
    res.redirect("/profile");;
});

router.get("/edit-plan", (req, res) => {
    res.render("plan/plan-edit");
});

router.get("/poi-detail/:id", async (req, res) => {
    const request = await axios.get(`https://www.triposo.com/api/20210615/poi.json?id=${req.params.id}&count=10&account=${process.env.TRIPOSO_ACCOUNT}&token=${process.env.TRIPOSO_TOKEN}`)
    const place = request.data.results[0]
    console.log("the place", place)
    res.render("poi/poi-detail", place);
});

module.exports = router;

// router.get("/books/:bookId", async (req, res) => {
//     const book = await Book.findById(req.params.bookId).populate("author");
//     res.render("books/book-detail", book);
//   });