import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function NewAssignment() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [assignedWorkplace, setAssignedWorkplace] = useState('');
    const [workplaceType, setWorkplaceType] = useState('');

    const confirmNewWorkstation = () => {
        if (assignedWorkplace !== '' && workplaceType !== '') {
            axios
                .post('http://localhost:5050/assign', {
                    assignedWorkplace: assignedWorkplace,
                    workplaceType: workplaceType,
                })
                .then((response) => {
                    alert(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
            const data = {
                workplaceName: assignedWorkplace
            }
            axios.post('http://localhost:8000/assign', {
                data
            }).then((response) => {
                alert(response.data);
            })
                .catch((error) => {
                    console.log(error);
                });
        };
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">
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
                        <li className="nav-item active"></li>
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
            <div style={{ position: 'relative', top: '10px', left: '10px', padding: '10px' }}>
                <label htmlFor="assignedWorkplace">Enter New workplace name:</label>
                <input type="text" id="assignedWorkplace" value={assignedWorkplace} onChange={(event) => setAssignedWorkplace(event.target.value)} />
                <br></br>
                <label htmlFor="workplaceType">Enter workplace type:</label>
                <input type="text" id="workplaceType" value={workplaceType} onChange={(event) => setWorkplaceType(event.target.value)} />
                <br></br>
                <button className="btn btn-primary ml-2" onClick={confirmNewWorkstation}>
                    Confirm Workstation
                </button>
            </div>
        </div>
    );
}

export default NewAssignment;
