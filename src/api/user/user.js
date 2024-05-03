const express = require("express");

const router = express.Router();
router.get("/user", (req, res) => {
    res.json({
        user: req.principal.user,
        id: req.principal.id
    })
})

module.exports = router;