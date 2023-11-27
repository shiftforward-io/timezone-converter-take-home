import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";

const TimeCard = ({ countryAndTimezone, onClose }) => {
  const [currentTim, setCurrentTim] = useState(new Date());

  const currentTime = new Date();
  const options = {
    timeZone: `${countryAndTimezone.zoneName}`, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  };
  const timeString = currentTime.toLocaleTimeString('en-US', options);
  const hours24 = timeString.substring(29, 31);
  const hours12 = (hours24 % 12) || 12;
  const amPm = hours24 >= 12 ? 'PM' : 'AM';
  const hoursT = hours12.toString().padStart(2, '0');
  const minutesT = timeString.substring(32, 34).padStart(2, '0');
  const secondsT = timeString.substring(35, 37).padStart(2, '0');
  const day = timeString.split(',')[0];
  const date = timeString.split(',')[1];
  const year = timeString.split(',')[2].substring(1, 5);
  const timezonecurrent = countryAndTimezone.zoneName.replace("/", "");



  useEffect(() => {
    const seconds = document.querySelector(`.seconds${timezonecurrent}`);
    const minutes = document.querySelector(`.minutes${timezonecurrent}`);
    const minute = document.querySelector(`.minute${timezonecurrent}`);
    const hour = document.querySelector(`.hour${timezonecurrent}`);

    for (let s = 0; s < 60; s++) {
      let mSpikeEl = document.createElement('i');
      let sSpikeEl = document.createElement('i');
      mSpikeEl.className = 'spike';
      sSpikeEl.className = 'spike';
      mSpikeEl.style = `--rotate:${6 * s}deg`;
      sSpikeEl.style = `--rotate:${6 * s}deg`;
      mSpikeEl.setAttribute('data-i', s);
      sSpikeEl.setAttribute('data-i', s);

      seconds.append(sSpikeEl);
      minutes.append(mSpikeEl);
    }

    const getTime = () => {
      const currentTim = new Date();
      const options = { timeZone: `${countryAndTimezone.zoneName}`, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
      const date = currentTim.toLocaleTimeString('en-US', options);
      let s = date.substring(6, 8).padStart(2, '0');
      let m = date.substring(3, 5).padStart(2, '0');

      hour.textContent = date.substring(0, 2).padStart(2, '0');
      minute.textContent = m;

      minutes.style = `--dRotate:${6 * m}deg`;

      if (s === 0) {
        seconds.classList.add('stop-anim');
      } else {
        seconds.classList.remove('stop-anim');
      }

      if (m === 0) {
        minutes.classList.add('stop-anim');
      } else {
        minutes.classList.remove('stop-anim');
      }

      seconds.style = `--dRotate:${6 * s}deg`;
    };

    const intervalId = setInterval(getTime, 1000);

    return () => clearInterval(intervalId);

  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTim(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  
  let bgc;
  if (hours24 <= 3) {
    bgc = '#000080e6';
  } else if (hours24 <= 6) {
    bgc = '#8A2BE2e6';
  } else if (hours24 <= 9) {
    bgc = '#FFD700e6';
  } else if (hours24 <= 12) {
    bgc = '#00BFFFe6';
  } else if (hours24 <= 15) {
    bgc = '#FF4500e6';
  } else if (hours24 <= 18) {
    bgc = '#FF6347e6';
  } else if (hours24 <= 21) {
    bgc = '#FF450059'; // Fix alpha value here
  } else if (hours24 <= 24) {
    bgc = '#191970e6';
  }



  return (
    <div className={`flex group relative justify-center items-center flex-col w-80 h-[29rem] text-black border border-[${bgc}] bg-[#8ABE2e6]  rounded-2xl`}>
      <button onClick={onClose} className="close-btn absolute text-white mr-5 top-3 text-2xl group-hover:opacity-100 lg:opacity-0 duration-200 ease-out w-full flex justify-end items-center  "><IoClose /></button>

      <second className="clockc p-4">
        <div className={`seconds seconds${timezonecurrent}`}></div>
        <div className={`minutes minutes${timezonecurrent}`}></div>
        <div className={`minute minute${timezonecurrent} bg-primary`}>44</div>
        <div className={`hour hour${timezonecurrent}`}></div>
      </second>

      <div className={`details relative bg-[${bgc}] w-full py-2 flex flex-col justify-center items-center rounded-b-2xl`}>
        <div className="time text-lg font-semibold"> {hoursT}:{minutesT}:{secondsT} <span className='text-lg font-old -ml-1'>{amPm}</span></div>
        <p className='text-center text-lg font-semibold flex justify-center items-center flex-col w-full'>{day}, {date}, {year}</p>
        <p className='font-bold text-2xl flex justify-center items-center flex-col w-full'>
          <span className='w-fit text-center flex flex-row justify-center items-center gap-1'>
            <img className='w-7 rounded-md' src={`https://assets.ipstack.com/flags/${countryAndTimezone.countryCode.toLowerCase()}.svg`} alt={`Flag of ${countryAndTimezone.countryCode.toLowerCase()}`} />
            {countryAndTimezone.countryName} </span>
          <span className='w-fit text-center text-lg font-semibold'>({countryAndTimezone.zoneName})</span>
        </p>
        {hours24 > 18 || hours24 < 6 ? 
        <svg className='absolute top-1 right-2 w-8 h-8' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.203 6.02337C7.59276 6.99074 5.45107 10.6948 6.41557 14.2943C7.38006 17.8938 11.0868 20.0307 14.6971 19.0634C16.1096 18.6849 17.2975 17.8877 18.1626 16.8409C15.1968 17.3646 12.2709 15.546 11.4775 12.585C10.7644 9.92365 12.0047 7.20008 14.3182 5.92871C13.3186 5.72294 12.2569 5.74098 11.203 6.02337ZM4.96668 14.6825C3.78704 10.2801 6.40707 5.75553 10.8148 4.57448C12.968 3.99752 15.1519 4.3254 16.9581 5.32413L16.6781 6.72587C16.4602 6.75011 16.241 6.79108 16.0218 6.8498C13.6871 7.47537 12.303 9.8703 12.9264 12.1968C13.5497 14.5233 15.9459 15.9053 18.2806 15.2797C18.7257 15.1604 19.1351 14.9774 19.5024 14.7435L20.5991 15.6609C19.6542 17.9633 17.6796 19.8171 15.0853 20.5123C10.6776 21.6933 6.14631 19.085 4.96668 14.6825Z" fill="#000000"></path> </g></svg>
         :
        
        <svg className='absolute top-1 right-2 w-8 h-8' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0,0,255.99185,255.99185"><g fillOpacity={0} fill="#dddddd" fillRule="nonzero" stroke="none" strokeWidth={1} strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit={10} strokeDasharray="" strokeDashoffset={0} fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: "normal" }} > <path d="M0,255.99185v-255.99185h255.99185v255.99185z" id="bgRectangle" /> </g> <g fill="#000000" fillRule="nonzero" stroke="none" strokeWidth={1} strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit={10} strokeDasharray="" strokeDashoffset={0} fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: "normal" }} > <g transform="scale(5.12,5.12)"> <path d="M24.90625,3.96875c-0.04297,0.00781 -0.08594,0.01953 -0.125,0.03125c-0.46484,0.10547 -0.79297,0.52344 -0.78125,1v6c-0.00391,0.35938 0.18359,0.69531 0.49609,0.87891c0.3125,0.17969 0.69531,0.17969 1.00781,0c0.3125,-0.18359 0.5,-0.51953 0.49609,-0.87891v-6c0.01172,-0.28906 -0.10547,-0.56641 -0.3125,-0.76172c-0.21094,-0.19922 -0.49609,-0.29687 -0.78125,-0.26953zM10.65625,9.84375c-0.375,0.06641 -0.67578,0.33984 -0.78125,0.70313c-0.10547,0.36719 0.00391,0.75781 0.28125,1.01563l4.25,4.25c0.24219,0.29688 0.62891,0.43359 1.00391,0.34766c0.37109,-0.08594 0.66406,-0.37891 0.75,-0.75c0.08594,-0.375 -0.05078,-0.76172 -0.34766,-1.00391l-4.25,-4.25c-0.20703,-0.22266 -0.50781,-0.33594 -0.8125,-0.3125c-0.03125,0 -0.0625,0 -0.09375,0zM39.03125,9.84375c-0.22656,0.03125 -0.4375,0.14453 -0.59375,0.3125l-4.25,4.25c-0.29687,0.24219 -0.43359,0.62891 -0.34766,1.00391c0.08594,0.37109 0.37891,0.66406 0.75,0.75c0.375,0.08594 0.76172,-0.05078 1.00391,-0.34766l4.25,-4.25c0.3125,-0.29687 0.40234,-0.76172 0.21875,-1.15234c-0.1875,-0.39453 -0.60156,-0.62109 -1.03125,-0.56641zM24.90625,15c-0.03125,0.00781 -0.0625,0.01953 -0.09375,0.03125c-0.0625,0.00391 -0.125,0.01563 -0.1875,0.03125c-0.01172,0.01172 -0.01953,0.01953 -0.03125,0.03125c-5.30469,0.22656 -9.59375,4.54688 -9.59375,9.90625c0,5.50391 4.49609,10 10,10c5.50391,0 10,-4.49609 10,-10c0,-5.33984 -4.25391,-9.64453 -9.53125,-9.90625c-0.03516,0 -0.05859,-0.03125 -0.09375,-0.03125c-0.10156,-0.03906 -0.20703,-0.05859 -0.3125,-0.0625c-0.01953,0 -0.04297,0 -0.0625,0c-0.03125,0 -0.0625,0 -0.09375,0zM24.9375,17c0.01953,0 0.04297,0 0.0625,0c0.03125,0 0.0625,0 0.09375,0c4.375,0.05078 7.90625,3.61328 7.90625,8c0,4.42188 -3.57812,8 -8,8c-4.41797,0 -8,-3.57812 -8,-8c0,-4.39844 3.54688,-7.96484 7.9375,-8zM4.71875,24c-0.55078,0.07813 -0.9375,0.58984 -0.85937,1.14063c0.07813,0.55078 0.58984,0.9375 1.14063,0.85938h6c0.35938,0.00391 0.69531,-0.18359 0.87891,-0.49609c0.17969,-0.3125 0.17969,-0.69531 0,-1.00781c-0.18359,-0.3125 -0.51953,-0.5 -0.87891,-0.49609h-6c-0.03125,0 -0.0625,0 -0.09375,0c-0.03125,0 -0.0625,0 -0.09375,0c-0.03125,0 -0.0625,0 -0.09375,0zM38.71875,24c-0.55078,0.07813 -0.9375,0.58984 -0.85937,1.14063c0.07813,0.55078 0.58984,0.9375 1.14063,0.85938h6c0.35938,0.00391 0.69531,-0.18359 0.87891,-0.49609c0.17969,-0.3125 0.17969,-0.69531 0,-1.00781c-0.18359,-0.3125 -0.51953,-0.5 -0.87891,-0.49609h-6c-0.03125,0 -0.0625,0 -0.09375,0c-0.03125,0 -0.0625,0 -0.09375,0c-0.03125,0 -0.0625,0 -0.09375,0zM15,33.875c-0.22656,0.03125 -0.4375,0.14453 -0.59375,0.3125l-4.25,4.25c-0.29687,0.24219 -0.43359,0.62891 -0.34766,1.00391c0.08594,0.37109 0.37891,0.66406 0.75,0.75c0.375,0.08594 0.76172,-0.05078 1.00391,-0.34766l4.25,-4.25c0.29688,-0.28516 0.38672,-0.72656 0.22656,-1.10547c-0.15625,-0.37891 -0.53516,-0.62109 -0.94531,-0.61328c-0.03125,0 -0.0625,0 -0.09375,0zM34.6875,33.875c-0.375,0.06641 -0.67578,0.33984 -0.78125,0.70313c-0.10547,0.36719 0.00391,0.75781 0.28125,1.01563l4.25,4.25c0.24219,0.29688 0.62891,0.43359 1.00391,0.34766c0.37109,-0.08594 0.66406,-0.37891 0.75,-0.75c0.08594,-0.375 -0.05078,-0.76172 -0.34766,-1.00391l-4.25,-4.25c-0.1875,-0.19922 -0.44531,-0.30859 -0.71875,-0.3125c-0.03125,0 -0.0625,0 -0.09375,0c-0.03125,0 -0.0625,0 -0.09375,0zM24.90625,37.96875c-0.04297,0.00781 -0.08594,0.01953 -0.125,0.03125c-0.46484,0.10547 -0.79297,0.52344 -0.78125,1v6c-0.00391,0.35938 0.18359,0.69531 0.49609,0.87891c0.3125,0.17969 0.69531,0.17969 1.00781,0c0.3125,-0.18359 0.5,-0.51953 0.49609,-0.87891v-6c0.01172,-0.28906 -0.10547,-0.56641 -0.3125,-0.76172c-0.21094,-0.19922 -0.49609,-0.29687 -0.78125,-0.26953z" /> </g> </g>
        </svg>
      }
      </div>
    </div>
  )
}

export default TimeCard




