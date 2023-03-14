import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import WorkerAssignment from '../../components/WorkerAssignment';


function WorkerList() {
    const [workerList, setWorkerList] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:5050/workers`).then((response) => {
            setWorkerList(response.data);
        });
    }, []);



    return (
        <div>
            <table>
                <thead>
                    <th>WorkerID</th>
                    <th>WorkerName</th>
                    <th>specialization</th>
                    <th>KPI</th>
                    <th>Assigned workplace</th>
                    <th>Details</th>
                </thead>
                <tbody>
                    {
                        workerList.map((val, key) => (
                            <tr>
                                <td>{val.workerID}</td>
                                <td>{val.workerName}</td>
                                <td>{val.specialization}</td>
                                <td>{val.kpi}</td>
                                <td><WorkerAssignment val={val.workerID} /></td>
                                <td><button>details</button></td>
                            </tr>
                        ))

                    }



                </tbody>
            </table>

        </div >
    )
}

export default WorkerList