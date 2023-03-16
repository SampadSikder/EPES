const express = require("express");
const router = express.Router();
const { Workers } = require("../models");
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }

})

//check image
const isImage = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    }
    else {
        cb(null, { error: "Only image" });
    }
}

const upload = multer({
    storage: storage,
    fileFilter: isImage
});

router.get("/", async (req, res) => {
    const listOfWorkers = await Workers.findAll();
    res.json(listOfWorkers);
});

router.post("/", upload.single('image'), async (req, res) => {

    const worker = req.body;
    console.log(worker);
    worker['picture'] = req.file.filename;
    const ifWorkerExist = await Workers.findOne({ where: { workerID: worker.workerID } });
    if (ifWorkerExist) {
        res.send("Worker exist");
    } else {
        await Workers.create(worker);
        res.send("Success");
    }

});
router.get("/:id", async (req, res) => {
    const listOfWorkers = await Workers.findOne({ where: { workerID: req.params.id } });
    res.json(listOfWorkers);
});

module.exports = router;