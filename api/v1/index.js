/*
console.log("Registering contact API.....!");

module.exports = function (app) {
    app.get("/hello", (req,res) =>{
        res.send("My hello world from submode <h1> BROH </h1>");
    });
    console.log("get /hello registradito.");
}
*/
const express = require("../../node_modules/express");
const router = express.Router();

const suicide_rates = require("./suicide-rates");

router.use("/suicide-rates", suicide_rates);

module.exports = router;