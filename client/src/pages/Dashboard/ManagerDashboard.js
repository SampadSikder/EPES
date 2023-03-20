import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Card from 'react-bootstrap/Card';

function ManagerDashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [managerInformation, setManagerInformation] = useState({});
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
        if (response.data.type === type && response.data.id === id) {
          setAuthState(true)
        }
      }
    });
  };

  useEffect(() => {
    axios.get(`http://localhost:5050/managers/${id}`).then((response) => {
      setManagerInformation(response.data);
    });
    authenticate("manager");
  }, []);

  const goTo = (path) => {
    navigate(path);
  }

  return (
    <>
      {
        authState && (
          <div className="ManagerDashboard">
            <Navbar managerInformation={managerInformation} key={id} />

            <div className="container">
              <div className="row">
                <div className="col-sm">

                  <Card border='dark' className='mt-3'>
                    <Card.Header>
                      Employee Leaderboard

                    </Card.Header>
                    <Card.Body>
                      <Card.Title>

                      </Card.Title>
                      <button type="button" className="btn btn-primary btn-block" style={{ fontSize: '14px', padding: '10px' }} onClick={() => goTo("/leaderboard")}>Leaderboard</button>
                    </Card.Body>
                  </Card>




                  <Card border='primary' className='mt-3'>
                    <Card.Header>
                      View Worker Assignment
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>

                      </Card.Title>

                      <button type="button" className="btn btn-primary btn-block" style={{ fontSize: '14px', padding: '10px' }} onClick={() => goTo(`/WorkerAssignment/${id}`)}>Worker Assignment</button>
                    </Card.Body>
                  </Card>
                </div>

                <div className="col-sm">
                  <Card border='info' className='mt-3'>
                    <Card.Header>
                      View List of Workers

                    </Card.Header>
                    <Card.Body>
                      <Card.Title>

                      </Card.Title>

                      <button type="button" className="btn btn-primary btn-block" style={{ fontSize: '14px', padding: '10px' }} onClick={() => goTo("/WorkerList")}>List of Workers</button>
                    </Card.Body>
                  </Card>
                  <Card border='success' className='mt-3'>
                    <Card.Header>
                      Employee Evaluation

                    </Card.Header>
                    <Card.Body>
                      <Card.Title>

                      </Card.Title>
                      <button type="button" className="btn btn-primary btn-block" style={{ fontSize: '14px', padding: '10px' }} onClick={() => goTo(`/workerEvaluation/${id}`)}>Employee Evaluation</button>
                    </Card.Body>
                  </Card>
                  <Card border='warning' className='mt-3'>
                    <Card.Header>
                      Monitor Employees
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>

                      </Card.Title>
                      <button type="button" className="btn btn-primary btn-block" style={{ fontSize: '14px', padding: '10px' }} >Go to monitoring</button>
                    </Card.Body>
                  </Card>
                  <Card border='dark' className='mt-3'>
                    <Card.Header>
                      Rewards and Training
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>

                      </Card.Title>
                      <button type="button" className="btn btn-primary btn-block" style={{ fontSize: '14px', padding: '10px' }} onClick={() => goTo(`/rewardsandtraining/${id}`)}>Assign Rewards or Training</button>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>

          </div>
        )
      }
    </>

  );
}

export default ManagerDashboard;