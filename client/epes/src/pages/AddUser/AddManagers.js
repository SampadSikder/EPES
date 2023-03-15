import React, { useEffect } from 'react'
import { useState } from 'react'
import Axios from 'axios';
import validator from 'validator';

function AddManagers() {
    const [managerName, setName] = useState("");
    const [managerID, setID] = useState("");
    const [department, setdepartment] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(1);

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
        Axios.post('http://localhost:5050/managers', {
            managerName: managerName,
            managerID: managerID,
            department: department,
        }).then((response) => {
            console.log(response.data);
        });
        Axios.post('http://localhost:5050/employees', {
            employeeID: managerID,
            password: password,
            type: "manager"
        }).then((response) => {
            alert(response.data);
        });
    }



    return (


        <>
            {
                authState && (
                    <div>

                        Add Manager:
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
                                <label>Department</label>
                                <input type="text" className="form-control" id="department" placeholder="Enter Department" required onChange={(event) => {
                                    setdepartment(event.target.value);
                                }} />

                            </div>
                            <div className="form-group">
                                <label>Enter Password:</label>
                                <input type="password" className="form-control" id="password" placeholder="Enter Password" required onChange={(event) => {
                                    validate(event.target.value);
                                }} />

                            </div>
                            <pre>
                                {
                                    errorMessage === 0 ? <span style={{
                                        fontWeight: 'bold',
                                        color: 'red',
                                    }}>Password ok<br></br>
                                        <button onClick={(e) => { addUser(e) }}>Add</button></span> :
                                        <span style={{
                                            fontWeight: 'bold',
                                            color: 'red',
                                        }}>Please enter a stronger password (Minimum 8 characters)</span>
                                }
                            </pre>


                        </form>

                    </div>
                )
            }

        </>


    )
}

export default AddManagers;