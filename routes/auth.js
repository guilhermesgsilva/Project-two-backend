const router = require("express").Router();

router.get("/signup", (req, res) => {
    res.render("auth/signup");
});

router.get("/login", (req, res) => {
    res.render("auth/login");
});

router.post("/logout", (req, res) => {
    // req.session.destroy();
    res.redirect("/");
});

module.exports = router;