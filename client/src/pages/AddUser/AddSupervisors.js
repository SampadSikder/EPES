import React, { useEffect } from 'react'
import { useState } from "react";
import Axios from 'axios';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';

function AddSupervisors() {
    const [supervisorName, setName] = useState("");
    const [supervisorID, setID] = useState("");
    const [department, setdepartment] = useState("");
    const [team, setTeam] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(1);

    const [authState, setAuthState] = useState(false);

    const navigate = useNavigate();
    const authenticate = (type) => {
        Axios.get("http://localhost:5050/auth", {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((response) => {
            if (response.data.error) {
                setAuthState(false);
            } else {
                if (response.data.type == type) {
                    setAuthState(true);
                }
            }
        });
    }
    useEffect(() => {
        authenticate("admin");
    }, []);
    const validate = (value) => {

        if (validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 1, minUppercase: 0, minSymbols: 0
        })) {
            setErrorMessage(0)
            setPassword(value)
            console.log(errorMessage)
        } else {
            setErrorMessage(1)
            console.log(errorMessage)
        }
    }

    const addUser = (event) => {
        event.preventDefault();
        Axios.post('http://localhost:5050/supervisors', {
            supervisorName: supervisorName,
            supervisorID: supervisorID,
            department: department,
            team: team
        }).then((response) => {
            console.log(response.data);
        });
        Axios.post('http://localhost:5050/employees', {
            employeeID: supervisorID,
            password: password,
            type: "supervisor"
        }).then((response) => {
            alert(response.data);
        });
        navigate("/adminDashboard");
    }

    return (
        <>{
            authState && (
                <div>

                    <div className='add-user-container'>
                        <br></br>
                        <h1 className='add-user-header text-white'>Add Supervisor</h1>
                        <form>
                            <div className="form-group">
                                <label><h6 className='text-white'>Name</h6></label>
                                <input type="text" className="form-control" id="name" placeholder="Enter name" required onChange={(event) => {
                                    setName(event.target.value);
                                }} />

                            </div>
                            <div className="form-group">
                                <label><h6 className='text-white'>Employee ID</h6></label>
                                <input type="number" className="form-control" id="emp_ID" placeholder="Enter Employee ID" required onChange={(event) => {
                                    setID(event.target.value);
                                }} />
                            </div>

                            <div className="form-group">
                                <label><h6 className='text-white'>Enter Department</h6></label>
                                <input type="text" className="form-control" id="department" placeholder="Enter Department" required onChange={(event) => {
                                    setdepartment(event.target.value);
                                }} />

                            </div>
                            <div className="form-group">
                                <label><h6 className='text-white'>Enter Team</h6></label>
                                <input type="text" className="form-control" id="team" placeholder="Enter team name" required onChange={(event) => {
                                    setTeam(event.target.value);
                                }} />
                            </div>
                            <div className="form-group">
                                <label><h6 className='text-white'>Password</h6></label>
                                <input type="password" className="form-control" id="password" placeholder="Enter Password" required onChange={(event) => {
                                    validate(event.target.value);
                                }} />

                            </div>
                            <pre>
                                {
                                    errorMessage === 0 ? <span style={{
                                        fontWeight: 'bold',
                                        color: 'red',
                                    }}>Password ok</span> :
                                        <span style={{
                                            fontWeight: 'bold',
                                            color: 'red',
                                        }}>Please enter a stronger password (Minimum 8 characters)</span>
                                }
                            </pre>

                            <button type="button" className='btn btn-primary d-flex justify-content-center' onClick={(e) => addUser(e)}>Add</button>
                        </form>

                    </div>
                </div>
            )}
        </>


    )
}

export default AddSupervisors