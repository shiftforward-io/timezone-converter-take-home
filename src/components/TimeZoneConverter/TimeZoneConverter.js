// TimeZoneConverter.js

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import moment from 'moment-timezone';
import 'moment/locale/en-gb';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import './TimeZoneConverter.css';
import ResultTime from '../ResultTime/ResultTime';
import axios from 'axios';

const TimeZoneConverter = () => {
  const [sourceTimeZone, setSourceTimeZone] = useState('');
  const [targetTimeZone, setTargetTimeZone] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [convertedTime, setConvertedTime] = useState('');
  const [timeZones, setTimeZones] = useState([]);
  const [warning, setWarning] = useState('');

  useEffect(() => {
    const fetchTimeZones = async () => {
      try {
        const response = await axios.get('https://worldtimeapi.org/api/timezone');
        const options = response.data.map((zone) => ({ value: zone, label: zone }));
        setTimeZones(options);
      } catch (error) {
        console.error('Error fetching time zones', error);
      }
    };

    fetchTimeZones();
  }, []);

  const convertTime = () => {
    if (!sourceTimeZone || !targetTimeZone || !selectedDate) {
      setWarning('Please select both source and target time zones, and choose a date and time.');
      return;
    }

    try {
      const selectedDateTime = moment(selectedDate).tz(sourceTimeZone);
      const converted = selectedDateTime.clone().tz(targetTimeZone).format('YYYY-MM-DD HH:mm:ss');
      setConvertedTime(converted);
      setWarning('');
    } catch (error) {
      console.error('Error converting time', error);
      setConvertedTime('Error converting time');
      setWarning('');
    }
  };

  return (
    <div className='time-converter'>
      {/* User Interface */}
      <div className='time-converter-container'>
        <label>
          <p>Source Time Zone:</p>
          <Select
            className='selector'
            options={timeZones}
            value={{ value: sourceTimeZone, label: sourceTimeZone }}
            onChange={(selectedOption) => setSourceTimeZone(selectedOption.value)}
          />
        </label>
        <br />
        <label>
          <p>Target Time Zone:</p>
          <Select
            className='selector'
            options={timeZones}
            value={{ value: targetTimeZone, label: targetTimeZone }}
            onChange={(selectedOption) => setTargetTimeZone(selectedOption.value)}
          />
        </label>
        <br />
        <label>
          <p>Select Date and Time:</p>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker']} style={{ height: 50 }}>
              <DateTimePicker onChange={(date) => setSelectedDate(date.$d)} />
            </DemoContainer>
          </LocalizationProvider>
        </label>
        <br />
        <button onClick={convertTime}>Convert Time</button>
        <br />
        {warning && <p className="warning">{warning}</p>}
      </div>
      {/* Display area for converted time */}
      <div className='result'>
        <ResultTime convertedTime={convertedTime} />
      </div>
    </div>
  );
};

export default TimeZoneConverter;
