// ResultTime.js

import React, { useState, useEffect } from 'react';
import './ResultTime.css';
import nightImage from '../../assets/night.jpg'
import eveningImage from '../../assets/evening.jpg'
import afternoonImage from '../../assets/afternoon.jpg'
import morningImage from '../../assets/morning.jpg'

function ResultTime({ convertedTime }) {
  // State to hold the formatted date and time
  const [formattedDate, setFormattedDate] = useState('');
  const [formattedTime, setFormattedTime] = useState('');
  const [timeOfDayImage, setTimeOfDayImage] = useState(null);

  useEffect(() => {
    // Format the converted time when it changes
    if (convertedTime) {
      const formatted = new Date(convertedTime);
      setFormattedDate(formatted.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }));
      setFormattedTime(formatted.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

      // Determine time of day and set the corresponding image
      const hour = formatted.getHours();
      if (hour >= 5 && hour < 12) {
        setTimeOfDayImage(morningImage);
      } else if (hour >= 12 && hour < 17) {
        setTimeOfDayImage(afternoonImage);
      } else if (hour >= 17 && hour < 20) {
        setTimeOfDayImage(eveningImage);
      } else {
        setTimeOfDayImage(nightImage);
      }
    } else {
      setFormattedDate('');
      setFormattedTime('');
      setTimeOfDayImage(null);
    }
  }, [convertedTime]);

  const backgroundImageStyle = timeOfDayImage
    ? { background: `url(${timeOfDayImage})`}
    : {};

  return (
    <div className="result-time" style={backgroundImageStyle}>
      <p className='time'>{formattedTime}</p>
      <p className='date'>{formattedDate}</p>
    </div>
  );
}

export default ResultTime;
