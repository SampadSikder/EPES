import React from 'react'
import { Link } from "react-router-dom"
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

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
        <>{


            authState && (


                <div>Type of user:
                    <button><Link to="/addManager">Manager</Link></button>
                    <button><Link to="/addSupervisor">Supervisor</Link></button>
                    <button><Link to="/addWorker">Worker</Link></button>
                </div>
            )
        }
        </>
    )
}

export default AddUser