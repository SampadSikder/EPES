//fetch data from browser
const express = require("express");
const router = express.Router();

let startEvaluation = false;
router.post("/", async (req, res) => {
    startEvaluation = true;
    if (startEvaluation == true) {
        res.send("Success");
    } else {
        res.send("failed");
    }
})

const totalEvaluation = (rating) => {
    console.log(startEvaluation);
    //const totalKpi=kpi*0.8+rating*0.2;
    const totalKpi = 1.2;
    return totalKpi;
}

module.exports = {
    totalEvaluation,
    router
}