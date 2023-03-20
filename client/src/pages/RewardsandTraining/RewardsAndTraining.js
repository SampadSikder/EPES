import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Card from 'react-bootstrap/Card';

function RewardsAndTraining() {
    let { id } = useParams();
    let navigate = useNavigate();
    const [authState, setAuthState] = useState(false);
    const [workers, setWorkers] = useState([]);
    const authenticate = (type) => {
        axios.get("http://localhost:5050/auth", {
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
        axios.get(`http://localhost:5050/workers`).then((response) => {
            setWorkers(response.data);
        });
        authenticate("manager");
    }, []);
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
                                    <th>Reward</th>
                                    <th>Training</th>
                                </tr>
                            </thead>
                            <tbody>
                                {workers.map((worker) => (
                                    <tr key={worker.workerID}>
                                        <td>{worker.workerID}</td>
                                        <td>{worker.workerName}</td>
                                        <td>
                                            <button className="btn btn-primary" style={{ backgroundColor: "green" }} onClick={() => navigate(`/rewards/${worker.workerID}`)}>
                                                Assign Reward
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-primary" style={{ backgroundColor: "red" }} onClick={() => navigate(`/trainings/${worker.workerID}`)}>
                                                Assign Training
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>)
            }
        </>
    )
}

export default RewardsAndTraining