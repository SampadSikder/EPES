import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';

function Training() {
    const { id } = useParams();
    const [logs, setLogs] = useState([]);
    const [events, setEvents] = useState('');
    const [training, setTraining] = useState("");
    const [greyedOut, setGreyedOut] = useState('false');
    const navigate = useNavigate();
    const goTo = (path) => {
        navigate(path);
    }

    const handleTrainingChange = (event) => {
        setTraining(event.target.value);
        console.log(training);
    }

    const confirmRating = () => {
        console.log(id);
        Axios.put(`http://localhost:5050/rt/training`, {
            type: training,
            workerID: id
        }).then((response) => {
            if (response.data.error) console.log(response.data.error);
            else {
                alert(response.data);
                setGreyedOut(true);
                window.location.reload();
            }
        })

    }
    const removeTraining = (type) => {
        console.log(id);
        console.log(type);
        Axios.put(`http://localhost:5050/rt/deltraining`, {
            type: type,
            workerID: id
        }).then((response) => {
            if (response.data.error) console.log(response.data.error);
            else {
                alert(response.data);
                setGreyedOut(true);
                window.location.reload();
            }
        })

    }



    useEffect(() => {
        authenticate("manager");
        Axios.get(`http://localhost:5050/rt/training/${id}`).then((response) => {
            console.log(response.data);
            setLogs(response.data);
        })
    }, []);






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
                if (response.data.type === type) {
                    setAuthState(true)
                }
            }
        });
    };

    return (
        <>
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

            <div style={{ position: 'relative', top: '10px', left: '10px', padding: '10px' }}>
                <form>
                    <label>
                        Pick type of training:
                        <select value={training} onChange={handleTrainingChange}>
                            <option value="Sewing training">Sewing training</option>
                            <option value="Iron training">Iron training</option>
                            <option value="Ethics">Ethics</option>
                            <option value="Teamwork">Teamwork</option>
                        </select>
                    </label>
                    <button className="btn btn-primary ml-2" onClick={() => confirmRating}>Confirm training</button>

                </form>
            </div>

            <h1 className="text-center">Trainings</h1>

            <table>
                <thead>
                    <tr>
                        <th>Assigned Trainings</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log) => (
                        <tr >
                            <td>{log.type} </td>
                            <td> <button className="btn btn-primary ml-2" onClick={() => removeTraining(log.type)}>Remove training</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>



        </>
    );
}

export default Training;
