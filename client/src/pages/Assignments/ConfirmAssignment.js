import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
function ConfirmAssignment({ val }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [assignment, setAssignment] = useState(null);
    const [workers, setWorkers] = useState([]);


    useEffect(() => {
        Axios.get("http://localhost:5050/assign/monitoring").then((response) => {
            try {
                console.log(response.data);
                setWorkers(response.data);
            } catch (err) {
                setWorkers("No workers");
            }
        });
    }, [val]);


    const post = (workerID, monitoringStatus) => {
        Axios.put(`http://localhost:5050/assign/startMonitoring/${workerID}`, {
            monitoringStatus: monitoringStatus
        }).then((response) => {
            try {
                console.log(response.data);
                window.location.reload(true);

            } catch (err) {
                console.log(err);
            }
        });

    }

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

    const confirmAssignment = (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        authenticate("supervisor");
    }, []);

    const goTo = (path) => {
        navigate(path);
    }

    return (
        <>
            {
                authState && (
                    <div>
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
                        </nav>
                        <h1>Worker Assignment</h1>

                        <table>
                            <thead>
                                <tr>
                                    <th>WorkerID</th>
                                    <th>Name</th>
                                    <th>Assigned work</th>
                                </tr>
                            </thead>
                            <tbody>
                                {workers.map((worker) => (
                                    <tr key={worker.WorkerWorkerID}>
                                        {worker.WorkerWorkerID !== null ? (
                                            <>
                                                <td>{worker.WorkerWorkerID}</td>
                                                <td>{worker.assignedWorkplace}</td>
                                                {worker.monitoringStatus ? (
                                                    <td>
                                                        <Button style={{ backgroundColor: "green" }} onClick={(e) => { post(worker.WorkerWorkerID, !worker.monitoringStatus) }}>Cancel Monitoring</Button>
                                                    </td>
                                                ) : (
                                                    <td>
                                                        <Button style={{ backgroundColor: "red" }} onClick={(e) => { post(worker.WorkerWorkerID, !worker.monitoringStatus) }}>Start Monitoring</Button>
                                                    </td>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <td>
                                                    Not assigned to worker
                                                </td>
                                                <td>
                                                    {worker.assignedWorkplace}
                                                </td>
                                            </>

                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                )
            }
        </>

    );
}

export default ConfirmAssignment;
