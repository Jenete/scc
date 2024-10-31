import React, { useEffect, useState } from 'react';
import { getInstantDateTime } from "../../helpers/utils"; // Ensure this function returns a formatted date and time
import './styles/TimeViewer.css'; // Import the CSS styles

const TimeViewer = ({setCurrentDateInput}) => {
    const [currentDate, setCurrentDate] = useState(getInstantDateTime());
    const step = 1000*60;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(getInstantDateTime());
            if(setCurrentDateInput)setCurrentDateInput(getInstantDateTime());
        }, step); // Update every second

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <div className="time-viewer-container">
            <span className="current-time">{currentDate.substring(0,18)}</span>
        </div>
    );
};

export default TimeViewer;


