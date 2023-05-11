import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddUser from "./pages/AddUser/AddUser";
import AddSupervisors from "./pages/AddUser/AddSupervisors";
import AddManagers from "./pages/AddUser/AddManagers";
import AddWorkers from "./pages/AddUser/AddWorkers";
import Login from "./pages/Login/Login";
import ManagerDashboard from "./pages/Dashboard/ManagerDashboard";
import SupervisorDashboard from "./pages/Dashboard/SupervisorDashboard";
import Leaderboard from "./pages/Leaderboard";
import WorkerList from "./pages/Worker/WorkerList";
import WorkerEvaluation from "./pages/Evaluation/WorkerEvaluation";
import EvaluationPage from "./pages/Evaluation/EvaluationPage";
import WorkerAttendance from "./pages/Worker/WorkerAttendance";
import WorkerAssignment from "./pages/Worker/WorkerAssignment";
import Home from "./pages/Home";
import ChangePassword from "./pages/ChangePassword";
import WorkerProfile from "./pages/Dashboard/WorkerProfile";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import ConfirmAssignment from "./pages/Worker/ConfirmAssignment";
import RewardsAndTraining from "./pages/RewardsandTraining/RewardsAndTraining";
import Rewards from "./pages/RewardsandTraining/Rewards";
import Training from "./pages/RewardsandTraining/Training";
import Camera from "./pages/Camera";
function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
          {/* <Route path="/" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Home" element={<Home />} /> */}
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/addManager" element={<AddManagers />} />
          <Route path="/addSupervisor" element={<AddSupervisors />} />
          <Route path="/addWorker" element={<AddWorkers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/managerDashboard/:id" element={<ManagerDashboard />} />
          <Route path="/supervisorDashboard/:id" element={<SupervisorDashboard />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/WorkerList" element={<WorkerList />} />
          <Route path="/workerEvaluation/:id" element={<WorkerEvaluation />} />
          <Route path="/EvaluationPage/:managerID/:workerID" element={<EvaluationPage />} />
          <Route path="/WorkerAttendance/:id" element={<WorkerAttendance />} />
          <Route path="/WorkerAssignment/:id" element={<WorkerAssignment />} />
          <Route path="/" element={<Home />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
          <Route path="/WorkerProfile/:id" element={<WorkerProfile />} />
          <Route path="/confirmassignment/:id" element={<ConfirmAssignment />} />
          <Route path="/rewardsandtraining/:id" element={<RewardsAndTraining />} />
          <Route path="/rewards/:id" element={<Rewards />} />
          <Route path="/trainings/:id" element={<Training />} />
          <Route path="/camera" element={<Camera />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
