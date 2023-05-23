import React, { useState, useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import "./Leaderboard.css";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Leaderboard() {
  const [showAll, setShowAll] = useState(false);
  const [workers, setWorkers] = useState([]);
  const navigate = useNavigate();
  const topFiveWorkers = workers.slice(0, 5);

  const renderTableRows = () => {
    const rows = showAll ? workers : topFiveWorkers;
    return rows.map((worker, index) => (
      <tr key={index}>
        <td>{worker.workerName}</td>
        <td>{worker.workerID}</td>
        <td>{worker.specialization}</td>
        <td>{worker.kpi}</td>
      </tr>
    ));
  };
  const downloadPDF = () => {
    Axios({
      url: 'http://localhost:5050/reports/evaluation-report',
      method: 'GET',
      responseType: 'blob' // Set the response type to blob
    })
      .then(response => {
        // Create a Blob URL from the response data
        const blobUrl = URL.createObjectURL(new Blob([response.data]));

        // Create a temporary <a> element and set its href to the Blob URL
        const link = document.createElement('a');
        link.href = blobUrl;

        // Set the download attribute and filename for the downloaded file
        link.setAttribute('download', 'filename.pdf');

        // Simulate a click on the link to trigger the download
        link.click();

        // Clean up the Blob URL by revoking it
        URL.revokeObjectURL(blobUrl);
      })
      .catch(error => {
        // Handle any errors
        console.error('Error downloading PDF:', error);
      });
  };
  useEffect(() => {
    Axios.get("http://localhost:5050/leaderboards").then((response) => {
      if (response.data.error) console.log(response.data.error);
      else {
        setWorkers(response.data);
        console.log(workers);
      }
    })
  }, []);

  return (
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
      <div className="container my-5">
        <h1 className="text-center mb-5">Leaderboard</h1>
        <Table striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>Worker ID</th>
              <th>Specialization</th>
              <th>KPI</th>
            </tr>
          </thead>
          <tbody>
            {renderTableRows()}
          </tbody>
        </Table>
        {!showAll && <Button color="primary" onClick={() => setShowAll(true)}>Show all workers</Button>}
      </div>
      <div className="ml-auto mr-auto text-center">
        <button className='btn btn-primary' onClick={() => downloadPDF()}>Get Evaluation Report</button>
      </div>
    </div>
  );
}

export default Leaderboard;
