import React from 'react'
import { useState, useEffect } from "react";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';


function AddWorkers() {
    let navigate = useNavigate();
    const [workerName, setName] = useState("");
    const [workerID, setID] = useState("");
    const [specialization, setspecialization] = useState("");
    const [workExperience, setWorkExperience] = useState("");
    const [fileDetails, setFileDetails] = useState();
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

    const onChangePicture = (e) => {
        console.log(e.target.files[0]);
        setFileDetails(e.target.files[0]);
    }

    useEffect(() => {
        authenticate("admin");
    }, []);

    const addUser = (e) => {
        e.preventDefault();
        const config = {
            headers: {
                "Content-type": "multipart/form-data"
            }
        }
        Axios.post('http://localhost:5050/workers', {
            workerName: workerName,
            workerID: workerID,
            specialization: specialization,
            workExperience: workExperience,
            image: fileDetails
        }, config).then((response) => {
            alert(response.data);

        });
        navigate("/adminDashboard");
    }


    return (
        <>
            {
                authState && (
                    <div className='add-user-container'>
                        <br></br>
                        <h1 className='add-user-header text-white'>Add Worker</h1>

                        <form encType="multipart/form-data">
                            <div className="form-group">
                                <label className='text-white'>Name</label>
                                <input type="text" className="form-control" id="name" placeholder="Enter name" required onChange={(event) => {

                                    setName(event.target.value);
                                }} />

                            </div>
                            <div className="form-group">
                                <label className='text-white'>Employee ID</label>
                                <input type="number" className="form-control" id="emp_ID" placeholder="Enter Employee ID" required onChange={(event) => {
                                    setID(event.target.value);
                                }} />
                            </div>

                            <div className="form-group">
                                <label className='text-white'>Enter Specialization:</label>
                                <input type="text" className="form-control" id="department" placeholder="Enter Specialization" required onChange={(event) => {
                                    setspecialization(event.target.value);
                                }} />
                            </div>
                            <div className="form-group">
                                <label className='text-white'>Enter Work Experience:</label>
                                <input type="text" className="form-control" id="department" placeholder="Enter Specialization" required onChange={(event) => {
                                    setWorkExperience(event.target.value);
                                }} />
                            </div>
                            <div className="form-group">
                                <label className='text-white'>Upload photo:</label>
                                <div style={{ display: "inline-block", marginLeft: "10px" }}>
                                    <input type="file" className="form-control" id="photo" name="photo" onChange={(event) => {
                                        onChangePicture(event);
                                    }}></input>
                                </div>
                            </div>
                            <button className="btn " onClick={(e) => { addUser(e) }}>Add</button>
                        </form>


                    </div>)
            }
        </>
    )
}

export default AddWorkers