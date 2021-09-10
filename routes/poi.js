const router = require("express").Router();

router.get("/:poiId", (req, res) => {
    res.render("poi/poi-detail");
});

module.exports = router;