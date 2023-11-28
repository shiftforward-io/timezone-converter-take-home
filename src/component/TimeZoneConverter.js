import React, { useState } from 'react';
import moment from 'moment-timezone';
import styled from 'styled-components';

const TimeZoneConverter = () => {
  const [selectedTime, setSelectedTime] = useState(
    moment().format('YYYY-MM-DDTHH:mm')
  );
  const [selectedTimeZone, setSelectedTimeZone] = useState('UTC');

  const handleTimeChange = (e) => {
    const newTime = moment(e.target.value);
    setSelectedTime(newTime.format('YYYY-MM-DDTHH:mm'));
  };

  const handleTimeZoneChange = (e) => {
    const newTimeZone = e.target.value;
    setSelectedTimeZone(newTimeZone);
  };

  const convertedTime = moment(selectedTime)
    .tz(selectedTimeZone)
    .format('MMMM Do YYYY, HH:mm');

  return (
    <StyledContainer>
      <StyledCard>
        <StyledHeader>Time-Zone Converter</StyledHeader>
        <StyledLabel>
          Select a time:
          <StyledInput
            type="datetime-local"
            value={selectedTime}
            onChange={handleTimeChange}
          />
        </StyledLabel>
        <StyledLabel id="selectTimeZone">
          Select a time zone:
          <StyledSelect
            value={selectedTimeZone}
            onChange={handleTimeZoneChange}
          >
            {moment.tz.names().map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </StyledSelect>
        </StyledLabel>
        <StyledResult>
          Converted time: <StyledStrong>{convertedTime}</StyledStrong>
        </StyledResult>
      </StyledCard>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const StyledCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 80%;
  max-width: 400px;
`;

const StyledHeader = styled.h1`
  color: #007ee5;
  text-align: center;
  font-family: 'Indie Flower', cursive;
  margin-bottom: 20px;
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 15px;
  font-family: 'Roboto', sans-serif;
  color: #333;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const StyledResult = styled.p`
  margin-top: 20px;
  font-family: 'Roboto', sans-serif;
  color: #555;
`;

const StyledStrong = styled.strong`
  color: #007ee5;
  font-weight: bold;
`;

export default TimeZoneConverter;
