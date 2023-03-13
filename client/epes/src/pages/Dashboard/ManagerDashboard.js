import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Navbar from '../../components/Navbar';

function ManagerDashboard() {
    let { id } = useParams();
    const [managerInformation, setManagerInformation] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:5050/managers/${id}`).then((response) => {
            setManagerInformation(response.data);
            console.log(response.data);
        })
    }, []);


    return (
        <div>
            <Navbar managerInformation={managerInformation} key={id}></Navbar>
            <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        <button type="button" className="btn btn-primary">Leaderboard</button>
                    </div>
                    <div className="col-sm-4">
                        <button type="button" className="btn btn-primary">Leaderboard</button>
                    </div>
                    <div className="col-sm-4">
                        <button type="button" className="btn btn-primary">Leaderboard</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManagerDashboard