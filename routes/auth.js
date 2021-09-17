const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

router.get("/signup", (req, res) => {
    res.render("auth/signup");
});

router.get("/login", (req, res) => {
    res.render("auth/login");
});

router.post("/signup", async (req, res) => {
const {username, password } = req.body;
if (username === "" || password === "") {
res.render("auth/signup", {errorMessage: "Fill username and password" });
return;
}

const user = await User.findOne({username});
if (user !== null) {
res.render("auth/signup", { errorMessage: "User already exists. Try again" });
 return;
    }

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hashedPassword = bcrypt.hashSync(password, salt);
await User.create({
username,
password: hashedPassword,
 });
 res.redirect("/login");
});
  
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
if (username === "" || password === "") {
res.render("auth/login", { errorMessage: "Fill username and password" });
eturn;
}

const user = await User.findOne({ username });
if (user === null) {
res.render("auth/login", { errorMessage: "Invalid login. Try again" });
return;}
  
if (bcrypt.compareSync(password, user.password)) {
req.session.currentUser = user;
res.redirect("/profile");
} else {
res.render("auth/login", {errorMessage: "Invalid login. Try again" });
}
  });

router.post("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

module.exports = router;