import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


function WorkerList() {
    const [workers, setWorkers] = useState([]);
    const navigate = useNavigate("");
    useEffect(() => {
        Axios.get(`http://localhost:5050/workers`).then((response) => {
            setWorkers(response.data);
        });
    }, []);


    function visitProfile(id) {

        navigate(`/WorkerProfile/${id}`)
    }

    return (
        <>


            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#" >
                        EPES
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">

                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={() => navigate(-1)}>
                                    Back
                                </a>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="http://localhost:3000/login">
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <table>
                    <thead>
                        <th>WorkerID</th>
                        <th>WorkerName</th>
                        <th>specialization</th>
                        <th>KPI</th>
                        <th>Assigned workplace</th>
                        <th>Details</th>
                    </thead>
                    <tbody>
                        {workers.map((worker) => (
                            <tr key={worker.id}>
                                <td>{worker.workerID}</td>
                                <td>{worker.workerName}</td>
                                <td>{worker.specialization}
                                </td>
                                <td>{worker.kpi}</td>
                                <td>{worker.assignedWorkplace}</td>

                                <td>
                                    <button className='btn btn-primary' onClick={() => visitProfile(worker.workerID)}>
                                        Visit Profile
                                    </button>
                                </td>
                            </tr>
                        ))}



                    </tbody>
                </table>

            </div >

        </>
    )
}

export default WorkerList