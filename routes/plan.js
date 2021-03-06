const router = require("express").Router();
const { default: axios } = require("axios");
const Plan = require("../models/Plan.model");
const User = require("../models/User.model");

function requireLogin(req, res, next) {
    if (req.session.currentUser) {
        next();
    } else {
        res.redirect("/login");
    }
}

// LIST
router.get("/profile", requireLogin, async (req, res) => {
  const user = await User.findById(req.session.currentUser._id);
  const plans = await Plan.find({ user });
  res.render("plan/profile-plan-list", { plans, user });
});

// CREATE
router.post("/create-plan", async (req, res) => {
  const user = await User.findById(req.session.currentUser._id);
  const { planName } = req.body;
  await Plan.create({
    planName,
    days: {
      ids: [],
    },
    user
  });
  res.redirect(`/profile`);
});

// DELETE
router.post("/profile/:planId/delete", async (req, res) => {
  await Plan.findByIdAndDelete(req.params.planId);
  res.redirect(`/profile/plans`);
});

// EDIT
router.get("/:userId/:planId/edit", requireLogin, async (req, res) => {
  const plan = await Plan.findById(req.params.planId);
  const planName = plan.planName;
  const request = await axios.get(
    `https://www.triposo.com/api/20210615/poi.json?location_id=${planName}&count=20&account=${process.env.TRIPOSO_ACCOUNT}&token=${process.env.TRIPOSO_TOKEN}`
  );
  const listOfPlaces = request.data.results;
  res.render("plan/plan-edit", { plan, listOfPlaces });
});

// ADD DAY
router.post("/add-day/:planId", async (req, res) => {
  await Plan.findByIdAndUpdate(req.params.planId, {
    $push: {
      days: {
        ids: [],
      },
    },
  });
  res.redirect(`/profile/${req.params.planId}/edit`);
});

// DELETE DAY
router.post("/delete-day/:planId", async (req, res) => {
  await Plan.findByIdAndUpdate(req.params.planId, {
    $pop: {
      days: 1,
    },
  });
  res.redirect(`/profile/${req.params.planId}/edit`);
});

// ADD ITEM
router.post("/add-item/:planId/:poiId", async (req, res) => {
  const request = await axios.get(
    `https://www.triposo.com/api/20210615/poi.json?id=${req.params.poiId}&account=${process.env.TRIPOSO_ACCOUNT}&token=${process.env.TRIPOSO_TOKEN}`
  );
  const place = request.data.results[0];

  const { planDay } = req.body;
  const index = planDay;
  const plan = await Plan.findById(req.params.planId);
  plan.days[index].ids.push(place);

  await Plan.findByIdAndUpdate(req.params.planId, {
    days: plan.days,
  });

  res.redirect(`/profile/${req.params.planId}/edit`);
});

// DELETE ITEM
router.post("/delete-item/:planId/:poiId", async (req, res) => {
  const plan = await Plan.findById(req.params.planId);
  plan.days.forEach((day) => {
    day.ids = day.ids.filter((ids) => {
      if (ids.id !== req.params.poiId) {
          return true;
      } else {
          return false;
      }
    });
  });
  await Plan.findByIdAndUpdate(req.params.planId, {
    days: plan.days,
  });

  res.redirect(`/profile/${req.params.planId}/edit`);
});

// DETAIL
router.get("/profile/:planId", requireLogin, async (req, res) => {
  const plan = await Plan.findById(req.params.planId);
  res.render("plan/plan-detail", plan);
});

module.exports = router;
