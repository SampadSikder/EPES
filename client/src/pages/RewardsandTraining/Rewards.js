import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';

function Rewards() {
    const { id } = useParams();
    const [logs, setLogs] = useState([]);
    const [events, setEvents] = useState('');
    const [coupon, setCoupon] = useState();
    const [greyedOut, setGreyedOut] = useState('false');
    const navigate = useNavigate();
    const goTo = (path) => {
        navigate(path);
    }

    const handleRatingChange = (event) => {
        setCoupon(event.target.value);
    }

    const confirmRating = () => {
        console.log(id);
        Axios.put(`http://localhost:5050/rt/rewards`, {
            coupon: coupon,
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
        Axios.get(`http://localhost:5050/rt/rewards/${id}`).then((response) => {
            console.log(id);
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
                <label htmlFor="rating">Enter coupons here:</label>
                <input type="number" id="rating" onChange={handleRatingChange} />
                <button className="btn btn-primary ml-2" onClick={confirmRating}>Confirm coupon assignment</button>
            </div>

            <h1 className="text-center">Rewards</h1>

            <table>
                <thead>
                    <tr>
                        <th>Available Coupons</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log) => (
                        <tr >
                            <td>{log.coupon}</td>
                        </tr>
                    ))}
                </tbody>
            </table>



        </>
    );
}

export default Rewards;
