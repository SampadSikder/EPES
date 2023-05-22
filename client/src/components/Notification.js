import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
function Notification() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5050/notifications`).then((response) => {
            setNotifications(response.data);
            console.log(response.data);
        });
    }, []);

    const top3Notifications = notifications.slice(-3);
    return (
        <div>

            {top3Notifications.length > 0 ? (
                top3Notifications.map((notification) => (
                    <p
                        style={{
                            backgroundColor: 'red',
                            border: '1px solid black',
                            padding: '10px',
                            margin: '10px 0',
                        }}
                    >
                        {notification.notification}
                    </p>
                ))
            ) : (
                <p>No notifications available</p>
            )}
        </div>


    )
}

export default Notification