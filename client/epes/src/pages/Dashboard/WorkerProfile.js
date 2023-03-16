import React from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

function WorkerProfile() {

    const { id } = useParams();

    const [workerInformation, setWorkerInformation] = useState({});
    const [filepath, setFilePath] = useState("");
    useEffect(() => {
        axios.get(`http://localhost:5050/workers/${id}`).then((response) => {
            setWorkerInformation(response.data);
            console.log(response.data);
            setFilePath(`http://localhost:5050/images/${response.data.picture}`);
        });
    }, []);
    return (

        <div>
            <h5 className="card-title">ID: {workerInformation.workerID}</h5>
            <p className="card-text">Name: {workerInformation.workerName}</p>
            <img src={filepath}></img>
        </div>
    )
}

export default WorkerProfile