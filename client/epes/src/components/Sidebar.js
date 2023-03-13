import React from 'react'


function Sidebar({ managerInformation }) {

    return (
        <div>
            <div className="card w-25">
                <div className="card-body">
                    <h5 className="card-title">ID: {managerInformation.managerID}</h5>
                    <p className="card-text">Name: {managerInformation.managerName}</p>
                    <p className="card-text">Department: {managerInformation.department}</p>
                </div>
            </div>
            <p></p>
        </div>
    )
}

export default Sidebar;
