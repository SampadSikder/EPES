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
                if (response.data.type === type) {
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
                                <button type="button" className="btn btn-primary btn-block" style={{ fontSize: '14px', padding: '10px' }} onClick={() => goTo("/leaderboard")}>Leaderboard</button>
                            </div>
                            <div className="col-sm-8 mb-3">
                                <button type="button" className="btn btn-primary btn-block" style={{ fontSize: '14px', padding: '10px' }}>Confirm Worker Assignment</button>
                            </div>
                            <div className="col-sm-8 mb-3">
                                <button type="button" className="btn btn-primary btn-block" style={{ fontSize: '14px', padding: '10px' }} onClick={() => goTo("/WorkerAttendance")}>Worker Attendance</button>
                            </div>
                            <div className="col-sm-8 mb-3">
                                <button type="button" className="btn btn-primary btn-block" style={{ fontSize: '14px', padding: '10px' }} onClick={() => goTo("/WorkerList")}>List of Workers</button>
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
