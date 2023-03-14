import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddUser from "./pages/AddUser/AddUser";
import AddSupervisors from "./pages/AddUser/AddSupervisors";
import AddManagers from "./pages/AddUser/AddManagers";
import AddWorkers from "./pages/AddUser/AddWorkers";
import Login from "./pages/Login/Login";
import ManagerDashboard from "./pages/Dashboard/ManagerDashboard";
import SupervisorDashboard from "./pages/Dashboard/SupervisorDashboard";
import WorkerList from "./pages/Lists/WorkerList";

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
          <Route path="/workerList" element={<WorkerList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
