const router = require("express").Router();

router.get("/profile", (req, res) => {
    res.render("plan/profile-plan-list");
});

router.get("/create-plan", (req, res) => {
    res.render("plan/plan-create");
});

router.post("/create-plan", (req, res) => {
    res.redirect("/profile");;
});

router.get("/edit-plan", (req, res) => {
    res.render("plan/plan-edit");
});

module.exports = router;