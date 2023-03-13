import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
function SupervisorDashboard() {
    let { id } = useParams();
    const [supervisorInformation, setSupervisorInformation] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:5050/supervisors/${id}`).then((response) => {
            setSupervisorInformation(response.data);
            console.log(response.data);
        })
    }, []);
    return (
        <div>{id}<br>
        </br>
            <p>{supervisorInformation.supervisorName}</p>
            <p>{supervisorInformation.department}</p>
            <p>{supervisorInformation.team}</p>
        </div>
    )
}

export default SupervisorDashboard