import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
function WorkerAssignment({ val }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState("");
  const [assignments, setAssignments] = useState({});
  const [workers, setWorkers] = useState([]);
  const [workplaceList, setWorkplaceList] = useState([]);
  const [managerInformation, setManagerInformation] = useState({});

  useEffect(() => {
    Axios.get("http://localhost:5050/attendance").then((response) => {
      try {
        console.log(response.data);
        setWorkers(response.data);
      } catch (err) {
        setWorkers("No workers");
      }
    });

    Axios.get("http://localhost:5050/assign").then((response) => {
      try {
        console.log(response.data);
        setWorkplaceList(response.data);
      } catch (err) {
        setWorkplaceList("No workers");
      }
    });
  }, [val]);


  const post = (workerID, assignment) => {
    Axios.put(`http://localhost:5050/assign/${id}`, {
      workerID: workerID,
      assignedWorkplace: assignment,
    })
      .then((response) => {
        console.log(response.data);
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePost = (worker) => {
    console.log(assignments);
    // Iterate over the workplaceList and post the assignment for each workplace
    Object.keys(assignments).forEach((workerID) => {
      const assignedWorkplace = assignments[workerID];
      post(workerID, assignedWorkplace)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  const [authState, setAuthState] = useState(false);

  const authenticate = (type) => {
    Axios.get("http://localhost:5050/auth", {
      headers: {
        accessToken: localStorage.getItem("accessToken")
      }
    }).then((response) => {
      if (response.data.error) {
        setAuthState(false);
      } else {
        if (response.data.type === type && response.data.id === id) {
          setAuthState(true)
        }
      }
    });
  };

  useEffect(() => {
    authenticate("manager");
    Axios.get(`http://localhost:5050/managers/${id}`).then((response) => {
      setManagerInformation(response.data);
    });
  }, []);

  const goTo = (path) => {
    navigate(path);
  }

  return (
    <>
      {
        authState && (
          <div>
            {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <a className="navbar-brand" href="#" onClick={() => goTo(`/managerDashboard/${id}`)} >
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
                  <li className="nav-item active">

                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={() => navigate(-1)}>
                      Back
                    </a>
                  </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a className="nav-link" href="http://localhost:3000/login">
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </nav> */}
            <Navbar managerInformation={managerInformation} key={id} />
            <h1>Worker Assignment</h1>

            <table>
              <thead>
                <tr>
                  <th>WorkerID</th>
                  <th>Name</th>
                  <th>Current work</th>
                  <th>Enter Worker Assignment</th>

                </tr>
              </thead>

              <tbody>
                {workers.map((worker) => (
                  <tr key={worker.workerID}>
                    <td>{worker.workerID}</td>
                    <td>{worker.workerName}</td>
                    <td>{worker.assignedWorkplace}</td>
                    <td>
                      <select
                        value={assignments[worker.workerID] || ""}
                        onChange={(e) =>
                          setAssignments({
                            ...assignments,
                            [worker.workerID]: e.target.value
                          })
                        }
                      >
                        <option value="">Select workplace</option>
                        {workplaceList.map((workplace, index) => (
                          <option key={index} value={workplace.assignedWorkplace}>
                            {workplace.assignedWorkplace}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        className="btn btn-primary ml-2"
                        onClick={() => handlePost(worker.workerID)}
                      >
                        Complete worker assignment
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* {workers.map((worker) => (
                  <tr key={worker.workerID}>
                    <td>{worker.workerID}</td>
                    <td>{worker.workerName}</td>
                    <td>{worker.assignedWorkplace}</td>
                    <td>
                      <select value={assignment} onChange={(e) => setAssignment(e.target.value)}>
                        <option>Select workplace</option>
                        {workplaceList.map((workplace, index) => (
                          <option key={index} value={workplace.assignedWorkplace}>
                            {workplace.assignedWorkplace}
                          </option>
                        ))}
                      </select>

                    </td>
                  </tr>
                ))} */}

            </table>
          </div>
        )
      }
    </>

  );
}

export default WorkerAssignment;
