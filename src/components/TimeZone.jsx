import React, { useState } from 'react'
import TimeCard from './TimeCard';
import countriesnonsorted from '../assets/coutries.json';
const TimeZone = () => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const handleCountrySelect = (country) => {
    setSelectedCountries((prevSelected) => [...prevSelected, country]);
    // if (!selectedCountries.find((selected) => selected.zoneName === country.zoneName)) {
    // }
  };
  const handleTimeCardClose = (country) => {
    setSelectedCountries((prevSelected) =>
      prevSelected.filter((selected) => selected.countryName !== country.countryName)
    );
  };
  const countries = countriesnonsorted.sort((a, b) => a.countryName.localeCompare(b.countryName));

  return (
    <div className='flex justify-center items-center w-full flex-col gap-10'>
      <div className='flex justify-center items-center mt-20 mb-12'>
        <select onChange={(e) => handleCountrySelect(JSON.parse(e.target.value))}
          className=' bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base'>
          {countries.map((country) => (
            <option key={country.countryName} value={JSON.stringify(country)} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary font-medium text-base">
              {country.countryName}
            </option>
          ))}
        </select>
      </div>
      <div className='flex justify-center items-center flex-wrap w-full gap-8'>
        {selectedCountries.map((country) => (
          <TimeCard
            key={country.countryName}
            countryAndTimezone={country}
            onClose={() => handleTimeCardClose(country)}
          />
        ))}
      </div>
    </div>
  )
}

export default TimeZone