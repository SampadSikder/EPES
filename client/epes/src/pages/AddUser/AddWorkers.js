import React from 'react'
import { useState, useEffect } from "react";
import Axios from 'axios';


function AddWorkers() {
    const [workerName, setName] = useState("");
    const [workerID, setID] = useState("");
    const [specialization, setspecialization] = useState("");
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
                if (response.data.type == type) {
                    setAuthState(true);
                }
            }
        });
    }
    useEffect(() => {
        authenticate("admin");
    }, []);

    const addUser = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:5050/workers', {
            workerName: workerName,
            workerID: workerID,
            specialization: specialization,
        }).then((response) => {
            alert(response.data);
        });
    }


    return (
        <>
            {
                authState && (

                    <div> Add worker:
                        <form>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" className="form-control" id="name" placeholder="Enter name" required onChange={(event) => {

                                    setName(event.target.value);
                                }} />

                            </div>
                            <div className="form-group">
                                <label>Employee ID</label>
                                <input type="number" className="form-control" id="emp_ID" placeholder="Enter Employee ID" required onChange={(event) => {
                                    setID(event.target.value);
                                }} />
                            </div>

                            <div className="form-group">
                                <label>Enter Specialization:</label>
                                <input type="text" className="form-control" id="department" placeholder="Enter Specialization" required onChange={(event) => {
                                    setspecialization(event.target.value);
                                }} />
                            </div>
                            <button onClick={(e) => { addUser(e) }}>Add</button>
                        </form>


                    </div>)
            }
        </>
    )
}

export default AddWorkers