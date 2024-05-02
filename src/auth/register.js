const express = require("express");
const {json} = require("express");
const router= express.Router();

router.get("/register", (req, res)=>{
    res.json({message: "hola"})
    res.status(200)
});


module.exports = router;
