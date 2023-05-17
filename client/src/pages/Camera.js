import React, { useState } from 'react'
import ReactPlayer from 'react-player';
import { useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Camera() {
    const [workplaces, setWorkplaces] = useState([]);
    const [assignedWorkplace, setAssignedWorkplace] = useState([]);

    const navigate = useNavigate("");
    useEffect(() => {
        axios.get("http://localhost:5050/camera").then((response) => {
            console.log(response.data);
            setWorkplaces(response.data);
        });
        axios.get("http://localhost:5050/assign/monitoring").then((response) => {
            console.log(response.data);
            setAssignedWorkplace(response.data);
        }
        )
    }, []);
    return (
        // <div>
        //     <h1>RTSP Video Stream</h1>
        //     {/* <ReactPlayer url='rtsp://10.100.103.26:8080/h264_ulaw.sdp' playing controls /> */}

        //     <ReactPlayer ref={playerRef} url='http://10.100.103.26:4747/video' controls />
        // </div>
        // <div>
        //     <h1>RTSP Video Stream</h1>
        //     {/* <ReactPlayer url='rtsp://10.100.103.26:8080/h264_ulaw.sdp' playing controls /> */}

        //     <ReactPlayer url='http://10.100.103.26:4747/video' playing controls config={{ file: { attributes: { controlsList: 'nodownload' } }, hls: { withCredentials: false, bufferedSeconds: 20 } }} />

        // </div>
        <>


            <div>
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
                <table>
                    <thead>
                        <tr>
                            <th>Workplace Name</th>
                            <th>Status</th>
                            <th>Camera URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workplaces.map((workplace) => {
                            const assigned = assignedWorkplace.find((w) => w.assignedWorkplace === workplace.workplaceName);
                            const status = assigned ? (assigned.monitoringStatus ? "Monitoring" : "Not Monitoring") : "Not Assigned";
                            return (
                                <tr key={workplace.workplaceName}>
                                    <td>{workplace.workplaceName}</td>
                                    <td>{status}</td>
                                    <td>
                                        <a href={workplace.cameraURL}>
                                            <button className="btn btn-primary">See Camera</button>
                                        </a>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

            </div >

        </>
    )
}

export default Camera