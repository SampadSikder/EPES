import React from 'react'
import { useState } from "react";
import Axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login() {
    const [employeeID, setID] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:5050/employees/login',
            {
                employeeID: employeeID,
                password: password,

            }).then((response) => {
                // if (response.data == "Wrong employeeID or password") {
                //     alert(response.data);
                // } else {
                //     if (response.data.type == "manager") {
                //         navigate(`/managerDashboard/${response.data.id}`);
                //     } else {
                //         navigate(`/supervisorDashboard/${response.data.id}`);
                //     }

                // }
                if (response.data.error) alert(response.data.error);
                else {
                    sessionStorage.setItem("accessToken", response.data);
                }

            });
    }
    return (
        <div>
            Login:
            <div className="form-group">
                <label>Employee ID</label>
                <input type="number" className="form-control" id="emp_ID" placeholder="Enter Employee ID" required onChange={(event) => {
                    setID(event.target.value);
                }} />
            </div>
            <div className="form-group">
                <label>Password: </label>
                <input type="password" className="form-control" id="emp_ID" placeholder="Enter Employee ID" required onChange={(event) => {
                    setPassword(event.target.value);
                }} />
            </div>
            <button onClick={(e) => { login(e) }}>Login</button>
        </div>
    )
}

export default Login