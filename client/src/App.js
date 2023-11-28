import React, {Fragment, useState} from 'react';
import moment from 'moment-timezone';
import {Timezone} from './components/Timezone';
import { FaSync } from "react-icons/fa";
import {Time} from './components/Time';
import {Date} from './components/Date';
import {FinalTime} from './components/FinalTime';
export default function App() {
  const [sourceTz, setSourceTz] = useState(moment.tz.guess());
  const [sourceTime, setSourceTime] = useState(null);
  const [sourceDate, setSourceDate] = useState(null);
  const [destTz, setDestTz] = useState('UTC');
  const [reset, setReset] = useState(false);
  function sourceTzChanged(value) {
   
    setSourceTz(value);
  }

  function destTzChanged(value) {
   
    setDestTz(value);
  }

  function time(hour, minute, isAM) {
    setSourceTime({hour, minute, isAM});
  }

  function date(year, month, date) {
 
    setSourceDate({year, month, date});
  }

  function today() {
    
    setReset(!reset);
  }
  return (
    <div className='container-body'>
      <div className='section'>
        <h1 className='title h1-title'>Time Zone Converter</h1>
    <div className="columns is-max-desktop">
      <div className="column is-1"></div>
      <div className="column is-5">
        <div className="box" id="from">
        <span>From</span>
        <Timezone initial={sourceTz} reset={reset} callback={sourceTzChanged}></Timezone>
        <span>To</span>
        <Timezone initial={destTz} callback={destTzChanged}></Timezone>
        <Time timezone={sourceTz} date={sourceDate} reset={reset} callback={time}></Time>
        <Date timezone={sourceTz} reset={reset} callback={date}></Date>
        <button style={{marginTop:"5px"}} className="button is-fullwidth" onClick={today}><span>RESET</span><span className="icon"><FaSync/></span>
        </button>
        </div>
      </div>

      <div className="column is-4">
        <div className="box" id="to">
        
        <FinalTime timezone={destTz} sourceTz={sourceTz} sourceTime={sourceTime} sourceDate={sourceDate}></FinalTime>
        </div>
      </div>
    </div>
    </div>
  </div>
  );
}