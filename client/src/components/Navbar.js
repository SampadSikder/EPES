import React from 'react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Navbar.css';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Notification from './Notification';

function Navbar({ managerInformation }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [toggleSidebar, setToggleSideBar] = useState(false);

  const setSideBar = () => {
    setToggleSideBar(!toggleSidebar);
  };

  const goTo = (path) => {
    navigate(path);
  }

  return (

    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" >
          EPES
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <a className="nav-link" onClick={() => goTo(`/managerDashboard/${id}`)}>
              Home
            </a>
            <NavDropdown title="Manage Workers" id="manageWorkers">
              <NavDropdown.Item href="#" onClick={() => goTo(`/WorkerAssignment/${id}`)}>Worker Assignment</NavDropdown.Item>
              <NavDropdown.Item href="#" onClick={() => goTo("/WorkerList")}>
                List of Workers
              </NavDropdown.Item>
              <NavDropdown.Item href="#" onClick={() => goTo("/AddWorkplace")}>Add Workplace</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Evaluation" id="evaluateEmployees">
              <NavDropdown.Item href="#" onClick={() => goTo(`/WorkerEvaluation/${id}`)}>
                Evaluation
              </NavDropdown.Item>
              <NavDropdown.Item href="#" onClick={() => goTo(`/rewardsandtraining/${id}`)}>Rewards and Training</NavDropdown.Item>
              <NavDropdown.Item href="#" onClick={() => goTo("/leaderboard")}>Leaderboard</NavDropdown.Item>
            </NavDropdown>
          </ul>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Popup trigger={<a className="nav-link">
                Notifications
              </a>}
                position="bottom center">
                <Notification />
              </Popup>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="http://localhost:3000/login">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
      {toggleSidebar && <Sidebar managerInformation={managerInformation} key={id}></Sidebar>}
    </div>
  );
}

export default Navbar;
