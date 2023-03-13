const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = require("./models");

const managerRouter = require("./routes/Managers");
app.use("/managers", managerRouter);

const supervisorRouter = require("./routes/Supervisors");
app.use("/supervisors", supervisorRouter);

const workerRouter = require("./routes/Workers");
app.use("/workers", workerRouter);

const employeeRouter = require("./routes/Employees");
app.use("/employees", employeeRouter);

db.sequelize.sync().then(() => {
    app.listen(5050, () => {
        console.log("Server running");
    });
});

