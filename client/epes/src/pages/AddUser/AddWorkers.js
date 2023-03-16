import React from 'react'
import { useState, useEffect } from "react";
import Axios from 'axios';


function AddWorkers() {
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
    }


    return (
        <>
            {
                authState && (

                    <div> Add worker:
                        <form encType="multipart/form-data">
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
                            <div className="form-group">
                                <label>Enter Work Experience:</label>
                                <input type="text" className="form-control" id="department" placeholder="Enter Specialization" required onChange={(event) => {
                                    setWorkExperience(event.target.value);
                                }} />
                            </div>
                            <div class="form-group">
                                <label class="control-label col-sm-2" for="photo">Upload photo:</label>
                                <div class="col-sm-2">
                                    <input type="file" class="form-control" id="photo" name="photo" onChange={(event) => {
                                        onChangePicture(event);
                                    }

                                    }></input>
                                </div>
                            </div>
                            <button onClick={(e) => { addUser(e) }}>Add</button>
                        </form>


                    </div>)
            }
        </>
    )
}

export default AddWorkers