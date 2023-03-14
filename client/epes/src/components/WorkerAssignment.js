import React from 'react';
import Axios from 'axios';
import { useState } from 'react';

function WorkerAssignment({ val }) {
    const [assignment, setAssignment] = useState("");

    const getWorkplace = (id) => {
        Axios.get(`http://localhost:5050/assign/${id}`).then((response) => {
            console.log(val);
            try {
                console.log(response.data);
                setAssignment(response.data.assignedWorkplace);
            } catch (err) {
                setAssignment("Not assigned");
            }
        });
    }
    return (
        <div>{getWorkplace(val)}
            <td>{assignment}</td>
        </div>
    )
}

export default WorkerAssignment