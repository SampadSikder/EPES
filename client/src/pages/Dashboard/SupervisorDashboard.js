import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import NavbarSupervisor from '../../components/NavbarSupervisor';
import Leaderboard from '../Leaderboard';
import { useNavigate } from 'react-router-dom';
import WorkerAttendance from '../Worker/WorkerAttendance';
import Card from 'react-bootstrap/Card';

function SupervisorDashboard() {
    let { id } = useParams();
    let navigate = useNavigate();
    const [supervisorInformation, setSupervisorInformation] = useState({});
    const [authState, setAuthState] = useState(false);


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
        axios.get(`http://localhost:5050/supervisors/${id}`).then((response) => {
            setSupervisorInformation(response.data);
        });
        authenticate("supervisor");
    }, []);


    const goTo = (path) => {
        navigate(path);
    }
    return (


        <>

            {authState && (
                <div>
                    <NavbarSupervisor supervisorInformation={supervisorInformation} key={id}></NavbarSupervisor>

                    <div className="container">

                        <div className="row">

                            <div className="col-sm-8 mb-3">
                                <Card>
                                    <Card.Header>
                                        Employee Leaderboard
                                    </Card.Header>
                                    <Card.Body>
                                        <button type="button" className="btn btn-primary btn-block" style={{ fontSize: '14px', padding: '10px' }} onClick={() => goTo("/leaderboard")}>Leaderboard</button>
                                    </Card.Body>
                                </Card>

                            </div>
                            <div className="col-sm-8 mb-3">
                                <Card>
                                    <Card.Header>
                                        Confirm Worker Assignment
                                    </Card.Header>
                                    <Card.Body>
                                        <button type="button" className="btn btn-primary btn-block" style={{ fontSize: '14px', padding: '10px' }} onClick={() => goTo(`/ConfirmAssignment/${id}`)}>Confirm</button>
                                    </Card.Body>
                                </Card>

                            </div>
                            <div className="col-sm-8 mb-3">
                                <Card>
                                    <Card.Header>
                                        Give Attendance
                                    </Card.Header>
                                    <Card.Body>
                                        <button type="button" className="btn btn-primary btn-block" style={{ fontSize: '14px', padding: '10px' }} onClick={() => goTo(`/WorkerAttendance/${id}`)}>Worker Attendance</button>
                                    </Card.Body>
                                </Card>

                            </div>
                            <div className="col-sm-8 mb-3">
                                <Card>
                                    <Card.Header>
                                        View List of Workers
                                    </Card.Header>
                                    <Card.Body>
                                        <button type="button" className="btn btn-primary btn-block" style={{ fontSize: '14px', padding: '10px' }} onClick={() => goTo("/WorkerList")}>List of Workers</button>
                                    </Card.Body>
                                </Card>

                            </div>
                            <div className="col-sm-8 mb-3">

                            </div>
                        </div>
                    </div>

                </div>
            )
            }



        </>

    )
}

export default SupervisorDashboard
