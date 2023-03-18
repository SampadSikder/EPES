
import { Link } from 'react-router-dom'

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
function AdminDashboard() {
  const navigate = useNavigate();
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
        if (response.data.type == type) {
          setAuthState(true);
        }
      }
    });
  }

  useEffect(() => {
    authenticate("admin");
  }, []);

  return (
    <>
      {
        authState && (
          <div>

            <div className='background'>;
              <div className="add-user-container">
                <br></br>
                <h1 className="add-user-header text-white" >EPES - Employee Performance Evaluation System</h1>
                <div className="add-user-buttons">
                  <button className="btn btn-primary"><Link to="/AddUser" className="add-user-link">Add User</Link></button>
                  <button className="btn btn-primary"><Link to="/ChangePassword" className="add-user-link">Change Password</Link></button>
                  <button className="btn btn-primary"><Link to="/" className="add-user-link">Logout</Link></button>
                </div>
              </div>
            </div>
          </div>
        )
      }

    </>
  )
}

export default AdminDashboard