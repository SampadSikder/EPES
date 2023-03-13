import React from 'react'
import { Link } from "react-router-dom"


function AddUser() {

    return (
        <div>Type of user:
            <button><Link to="/addManager">Manager</Link></button>
            <button><Link to="/addSupervisor">Supervisor</Link></button>
            <button><Link to="/addWorker">Worker</Link></button>
        </div>
    )
}

export default AddUser