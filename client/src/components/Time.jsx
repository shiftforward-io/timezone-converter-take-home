import React, { useState, useEffect, Fragment } from 'react';
import moment from 'moment-timezone';
import '../components/style.css'
export  function Time({ timezone, reset, callback }) {
  const isAM = () => (moment.tz(timezone).format("A") === "AM" ? true : false);
  const getHours = () => moment.tz(timezone).format("h");
  const getMinutes = () => moment.tz(timezone).minutes();

  const [hours, setHours] = useState(getHours());
  const [minutes, setMinutes] = useState(getMinutes());
  const [am, setAM] = useState(isAM());

  useEffect(() => {
    setHours(getHours());
    setMinutes(getMinutes());
    setAM(isAM());
  }, [timezone, reset]);

  useEffect(() => {
    callback(hours, minutes, am);
  }, [hours, minutes, am]);

  function handleChange(event) {
    const target = event.target;
  
    switch (target.id) {
      case "hours":
        setHours(target.value);
        break;
      case "minutes":
        setMinutes(target.value);
        break;
      case "am":
        setAM(target.checked);
        break;
    }
  }

  return (
    <Fragment>
      <div className="is-divider" data-content="TIME"></div>
      <div className="field field-div">
        <label className='label-text'>Hours</label>
        <div className="control">
          <input
          
            id="hours"
            className="input"
            type="number"
            min="0"
            max="12"
            step="1"
            value={hours}
            onChange={handleChange}
          />
        </div>
        <label className='label-text'>Minutes</label>
        <div className="control">
          <input
            id="minutes"
            className="input"
            type="number"
            min="0"
            max="59"
            step="1"
            value={minutes}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="field">
        <input
          id="am"
          type="checkbox"
          className="switch is-rtl is-warning"
          checked={am}
          onChange={handleChange}
        />
        <label className='label-text' style={{paddingTop:0}} htmlFor="am">{am ? "AM" : "PM"}</label>
      </div>
    </Fragment>
  );
}