
import React from 'react';
import { Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./AddUser.css";
function AddUser() {
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
                if (response.data.type == type) {
                    setAuthState(true);
                }
            }
        });
    }

    useEffect(() => {
        authenticate("admin");
    }, []);

    return (
        <div>
            {
                authState && (
                    <div className="add-user-container">
                        <br></br>
                        <h1 className="add-user-header text-white" >Add User</h1>
                        <div className="add-user-buttons">
                            <button className="btn btn-primary"><Link to="/addManager" className="add-user-link">Add Manager</Link></button>
                            <button className="btn btn-primary"><Link to="/addSupervisor" className="add-user-link">Add Supervisor</Link></button>
                            <button className="btn btn-primary"><Link to="/addWorker" className="add-user-link">Add Worker</Link></button>
                        </div>
                    </div>
                )
            }
        </div>



    )
}

export default AddUser;

