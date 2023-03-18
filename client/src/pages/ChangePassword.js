import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function ChangePassword() {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState(false);
  const [employeeID, setEmployeeID] = useState("");
  const [password, setPassword] = useState("");

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

  const ChangePassword = (e) => {
    e.preventDefault();
    axios.put("http://localhost:5050/employees/editpassword", {
      employeeID: employeeID,
      password: password
    }).then((response) => {
      alert(response.data);
      navigate("/adminDashboard");
    })
  }

  useEffect(() => {
    authenticate("admin");
  }, []);
  return (
    <>
      {
        authState && (
          <div className='add-user-container'>
            <br></br>
            <h1 className='add-user-header text-white'>Add Worker</h1>

            <form encType="multipart/form-data">
              <div className="form-group">
                <label className='text-white'>EmployeeID</label>
                <input type="text" className="form-control" id="name" placeholder="Enter name" required onChange={(event) => {

                  setEmployeeID(event.target.value);
                }} />

              </div>
              <div className="form-group">
                <label className='text-white'>Enter new password</label>
                <input type="password" className="form-control" id="emp_ID" placeholder="Enter Employee ID" required onChange={(event) => {
                  setPassword(event.target.value);
                }} />
              </div>


              <button className="btn " onClick={(e) => { ChangePassword(e) }}>Add</button>
            </form>


          </div>)
      }
    </>
  )
}

export default ChangePassword