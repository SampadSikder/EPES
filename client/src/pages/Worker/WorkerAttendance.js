import React, { useState, useEffect } from 'react';
import { Input } from 'reactstrap';
import NavbarSupervisor from '../../components/NavbarSupervisor';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function WorkerAttendance() {
  const [workers, setWorkers] = useState([]);
  const navigate = useNavigate();
  const handleOnChangeAgreement = (workerID, isChecked) => {
    const attendance = isChecked ? true : false;

    setWorkers(prevState => {
      const updatedWorkers = [...prevState];
      const workerIndex = updatedWorkers.findIndex(worker => worker.workerID === workerID);
      updatedWorkers[workerIndex].attendance = attendance;
      console.log(updatedWorkers);
      return updatedWorkers;
    });
  };

  const handleConfirmAttendance = () => {
    const attendanceList = workers.map((worker) => ({
      workerID: worker.workerID,
      present: !!worker.attendance ? true : false
    }));

    Axios.put("http://localhost:5050/attendance", attendanceList)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    //window.location.reload()
  };

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
    authenticate("supervisor");
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#" onClick={() => navigate(-1)} >
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
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {workers.map((worker) => (
                  <tr key={worker.workerID}>
                    <td>{worker.workerID}</td>
                    <td>{worker.workerName}</td>
                    <td>
                      <Input
                        name={`attendance-${worker.workerID}`}
                        type="checkbox"
                        label="Present"
                        checked={worker.attendance}
                        onChange={(e) => handleOnChangeAgreement(worker.workerID, e.target.checked)}
                      />
                      Present?
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" className="btn btn-primary btn-block mt-2" onClick={handleConfirmAttendance} style={{ fontSize: '14px', padding: '10px' }}>Confirm Attendance</button>
          </div>)

      }
    </div>

  );
}

export default WorkerAttendance;
