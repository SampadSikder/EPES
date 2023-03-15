import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
function SupervisorDashboard() {
    let { id } = useParams();
    const [supervisorInformation, setSupervisorInformation] = useState({});
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
        axios.get(`http://localhost:5050/supervisors/${id}`).then((response) => {
            setSupervisorInformation(response.data);
            console.log(response.data);
        });
        authenticate("supervisor");
    }, []);
    return (
        <>
            {

                authState && (
                    <div>{id}<br>
                    </br>
                        <p>{supervisorInformation.supervisorName}</p>
                        <p>{supervisorInformation.department}</p>
                        <p>{supervisorInformation.team}</p>
                    </div>)
            }
        </>
    )
}

export default SupervisorDashboard