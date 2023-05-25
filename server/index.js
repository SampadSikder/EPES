const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

app.use(cors());
app.use(express.json());

//public folder to serve public files
app.use(express.static("public"));

const db = require("./models");

const managerRouter = require("./routes/Managers");
app.use("/managers", managerRouter);

const supervisorRouter = require("./routes/Supervisors");
app.use("/supervisors", supervisorRouter);

const workerRouter = require("./routes/Workers");
app.use("/workers", workerRouter);

const employeeRouter = require("./routes/Employees");
app.use("/employees", employeeRouter);

const leaderboardRouter = require("./routes/Leaderboards");
app.use("/leaderboards", leaderboardRouter);

const assignmentRouter = require("./routes/Assignments");
app.use("/assign", assignmentRouter);

const criticalLogRouter = require("./routes/CriticalLogs");
app.use("/critical", criticalLogRouter);

const ratingRouter = require("./routes/Ratings");
app.use("/rating", ratingRouter);

const rewardsAndTrainingRouter = require("./routes/RewardsAndTraining");
app.use("/rt", rewardsAndTrainingRouter);

const startEvaluationRouter = require("./evaluation/evaluate");
app.use("/startEvaluation", startEvaluationRouter.router);

const attendanceRouter = require("./routes/Attendance");
app.use("/attendance", attendanceRouter);

const authenticator = require("./routes/Auth");
app.use("/auth", authenticator);

const reports = require("./documents/report");
app.use("/reports", reports);

const camera = require("./routes/Camera");
app.use("/camera", camera);

const notifications = require("./routes/Notifications");
app.use("/notifications", notifications);

db.sequelize.sync().then(() => {
    app.listen(5050, () => {
        console.log("Server running");
    });
});

