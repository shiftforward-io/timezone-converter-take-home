import React, { useState } from 'react'
import Hero from '../components/Hero'
import TimeZone from '../components/TimeZone'

const Landing = () => {
  const options = {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', weekYear: 'numeric'
  };
  function getWeek(date) {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
    return weekNumber;
  }
  const weekNumber = getWeek(new Date());
  const formattedDate = `${new Date().toLocaleTimeString('en-US', options).split(' at')[0]}, ${weekNumber}`;

  return (
    <div className='bg-primary text-white px-6 md:px-12 lg:px-16 xl:px-20 pb-44'>
      <Hero currentT={formattedDate} />
      <TimeZone />


    </div>
  )
}

export default Landing