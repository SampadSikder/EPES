import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Notification() {
    const [notifications, setNotifications] = useState([]);

    const downloadAttendancePDF = () => {
        axios({
            url: 'http://localhost:5050/reports/manpower-report',
            method: 'GET',
            responseType: 'blob'
        })
            .then(response => {

                const blobUrl = URL.createObjectURL(new Blob([response.data]));


                const link = document.createElement('a');
                link.href = blobUrl;

                link.setAttribute('download', 'manpower.pdf');

                link.click();

                URL.revokeObjectURL(blobUrl);
            })
            .catch(error => {
                // Handle any errors
                console.error('Error downloading PDF:', error);
            });
    };

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('http://localhost:5050/notifications');
                setNotifications(response.data);

            } catch (error) {
                console.log(error);
            }
        };

        fetchNotifications();
    }, []);

    const removeNotification = (notification) => {
        const updatedNotifications = notifications.filter((n) => n.notification !== notification);
        setNotifications(updatedNotifications);
    };


    return (
        <div>
            {notifications.length > 0 ? (
                notifications.map((notification) => (
                    <div
                        key={notification.id}
                        style={{
                            backgroundColor: '#FF4500',
                            border: '1px solid black',
                            padding: '10px',
                            margin: '10px 0',
                        }}
                    >
                        <p style={{ color: 'aliceblue' }}>
                            {notification.notification}</p>
                        {notification.notification === 'Attendance updated' && (
                            <button style={{

                                backgroundColor: '#FFFFFF',
                                color: '#FF4500',
                                border: '1px solid #FF4500',
                                padding: '5px 10px',
                                marginRight: '10px',

                            }} onClick={() => downloadAttendancePDF()}>Download Attendance Report</button>
                        )}
                        <button style={{
                            backgroundColor: '#FF4500',
                            color: '#FFFFFF',
                            border: 'none',
                            padding: '5px 10px',
                        }} onClick={() => removeNotification(notification.notification)}>Remove</button>
                    </div>
                ))
            ) : (
                <p>No notifications available</p>
            )}

        </div>
    );
}

export default Notification;