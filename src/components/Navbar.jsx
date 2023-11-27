import React from 'react'
import logo from '../assets/clock.svg';

const Navbar = () => {
  return (
    <div className='py-6 flex justify-start items-center gap-4 w-full'>
      <img src={logo} alt="logo" className='w-12'/>
      <div className="text-xl lg:text-2xl leading-5 tracking-wider text-blac font-bold">TimeZ</div>

    </div>
  )
}

export default Navbar