import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';

function WorkerEvaluation() {
  let { id } = useParams();
  const [workers, setWorkers] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    Axios.get(`http://localhost:5050/workers`).then((response) => {
      setWorkers(response.data);
    });
  }, []);

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
        if (response.data.type === type) {
          setAuthState(true)
        }
      }
    });
  };

  useEffect(() => {
    authenticate("manager");
  }, []);

  const goTo = (path) => {
    navigate(path);
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#" >
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
      </nav>
      {
        authState && (

          <div>
            <h1>Worker List</h1>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Assigned workplace</th>
                  <th>KPI</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {workers.map((worker) => (
                  <tr key={worker.workerID}>
                    <td>{worker.workerID}</td>
                    <td>{worker.workerName}</td>
                    <td>{worker.assignedWorkplace}</td>
                    <td>{worker.kpi}</td>
                    <td>
                      <button className="btn btn-primary" onClick={() => goTo(`/evaluationPage/${id}/${worker.workerID}`)}>
                        Evaluate Employee
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>)
      }
    </>
  );


}

export default WorkerEvaluation;