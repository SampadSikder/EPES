import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NavbarSupervisor from '../../components/NavbarSupervisor';
import image from './images.png';
import './WorkerProfile.css';

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
    <div className="worker-profile-container">
      <div className="worker-profile-header">
        <img src={imageUrl} alt={imageAltText} />
        {workerInformation && (
          <>
            <h1>{workerInformation.workerName}</h1>
            <h2>ID</h2>
            <p>{workerInformation.workerID}</p>
            <h2>Specialization</h2>
            <p>{workerInformation.specialization}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default WorkerProfile;