import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'

const Hero = ({currentT}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  const hours = currentTime.getHours().toString().padStart(2, '0');
  const minutes = currentTime.getMinutes().toString().padStart(2, '0');
  const seconds = currentTime.getSeconds().toString().padStart(2, '0');

  return (
    <div className='flex flex-col justify-center items-center w-full'>
      <Navbar />
      <div className="flex justify-center w-full text-black-lite flex-col">
        <div className="flex flex-col justify-center items-start">
          <p className='text-[30px] lg:text-[33px] xl:text-[36px] font-black leading-10'>Your clock is 0.7 seconds ahead.</p>
          <p className='text-[14px] lg:text-[16px] xl:text-[18px]  leading-[20px] lg:leading-[26px]'>Accuracy of synchronization was ±0.071 seconds.</p>
          <p className='text-[14px] lg:text-[16px] xl:text-[18px]  leading-[20px] lg:leading-[26px]'>Time now:</p>
        </div>
        <div className="flex justify-center items-center font-lato text-[80px] md:text-[150px] lg:text-[210px] xl:text-[285px] font-black lg:-mt-10">
          <div className="clock text-black-lite">
            <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
          </div>
        </div>
        <div className="flex flex-col justify-center items-end">
          <p className='text-[30px] lg:text-[33px] xl:text-[36px] leading-10'>{currentT}</p>
        </div>
      </div>
    </div>
  )
}

export default Hero