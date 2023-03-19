import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavbarSupervisor from '../../components/NavbarSupervisor';
import image from './images.png';
import './WorkerProfile.css';
import Card from 'react-bootstrap/Card'

function WorkerProfile() {
  const { id } = useParams();

  const [workerInformation, setWorkerInformation] = useState(null);
  const [filepath, setFilePath] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5050/workers/${id}`)
      .then((response) => {
        console.log(response.data);
        setWorkerInformation(response.data);
        setFilePath(`http://localhost:5050/images/${response.data.picture}`);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);


  const imageUrl = filepath ? filepath : image;
  const imageAltText = workerInformation ? `Picture of ${workerInformation.name}` : "Default image";

  return (


    <div className="container mt-5" >
      <div className="worker-profile-header">
        <img src={imageUrl} alt={imageAltText} />
        {workerInformation && (
          <>
            <Card border='info' className='mt-3'>
              <Card.Header>
                Employee Name
              </Card.Header>
              <Card.Body>
                <h1>{workerInformation.workerName}</h1>

              </Card.Body>
            </Card>
            <Card border='secondary' className='mt-3'>
              <Card.Header>
                Employee ID
              </Card.Header>
              <Card.Body>

                <p>{workerInformation.workerID}</p>
              </Card.Body>

            </Card>
            <Card border='primary' className='mt-3'>
              <Card.Header>

                <h2>Specialization</h2>
              </Card.Header>
              <Card.Body>

                <p>{workerInformation.specialization}</p>
              </Card.Body>
            </Card>
            <Card border='dark' className='mt-3'>
              <Card.Header>
                KPI Score
              </Card.Header>
              <Card.Body>

                <p>{workerInformation.kpi}</p>
              </Card.Body>
            </Card>
          </>
        )}
      </div>
    </div>

  );
}

export default WorkerProfile;