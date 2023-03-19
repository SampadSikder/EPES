import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';

function EvaluationPage() {
  let { managerID, workerID } = useParams();
  const [logs, setLogs] = useState([]);
  const [events, setEvents] = useState('');
  const [rating, setRating] = useState();
  const [greyedOut, setGreyedOut] = useState('false');
  const navigate = useNavigate();
  const goTo = (path) => {
    navigate(path);
  }




  const handleEventsChange = (event) => {
    setEvents(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  }

  const confirmRating = () => {
    console.log(rating);
    if (rating > 0 && rating <= 5) {
      Axios.put(`http://localhost:5050/rating/${managerID}`, {
        rating: rating,
        workerID: workerID
      }).then((response) => {
        if (response.data.error) console.log(response.data.error);
        else {
          alert(response.data);
          setGreyedOut(true);
        }
      })
    }
  }

  const postLog = (type) => {
    Axios.post(`http://localhost:5050/critical/${managerID}`, {
      workerID: workerID,
      log: events,
      type: type
    }).then((response) => {
      if (response.data.error) console.log(response.data.error);
      else {
        window.location.reload(true);
      }
    })
  }




  useEffect(() => {
    authenticate("manager");
    Axios.get(`http://localhost:5050/critical/${workerID}`).then((response) => {
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
        <label htmlFor="rating">Enter rating here:</label>
        <input type="number" id="rating" onChange={handleRatingChange} />
        <button className="btn btn-primary ml-2" onClick={confirmRating}>Confirm rating</button>
      </div>

      <h1 className="text-center">CRITICAL INCIDENT LOGGING</h1>

      <table>
        <thead>
          <tr>
            <th>Log</th>
            <th>Type</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr >
              <td>{log.log}</td>
              <td>{log.type}</td>
            </tr>
          ))}
        </tbody>
      </table>






      <div style={{ marginTop: '100px', height: '500px' }}>
        <h2>Critical Incident Logs</h2>
        <div style={{ display: 'flex', height: '90%' }}>
          <div style={{ flex: '1', backgroundColor: 'lightpink', padding: '10px' }}>
            <h3>Bad Events</h3>
            <textarea onChange={handleEventsChange} style={{ height: '80%', width: '98%' }} />
            <button className="btn btn-primary" onClick={() => postLog("bad")}>Confirm Log</button>
          </div>
          <div style={{ flex: '1', backgroundColor: 'lightblue', padding: '10px' }}>
            <h3>Excellent Events</h3>
            <textarea onChange={handleEventsChange} style={{ height: '80%', width: '98%' }} />
            <button className="btn btn-primary" onClick={() => postLog("excellent")}>Confirm Log</button>
          </div>

        </div>

      </div>



    </>
  );
}

export default EvaluationPage;
