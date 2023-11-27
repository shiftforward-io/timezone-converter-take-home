import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment-timezone";

export function Date({ timezone, reset, callback }) {
  const [selectedDate, setSelectedDate] = useState(moment.tz(timezone));

  useEffect(() => {
    const local = moment.tz.guess();
    setSelectedDate(moment.tz(local));
  }, [reset]);

  useEffect(() => {
    callback(selectedDate.year(), selectedDate.month(), selectedDate.date());
  }, [selectedDate]);

  return (
    <>
      <div className="is-divider" data-content="DATE"></div>
      <DatePicker
        className="input"
        selected={selectedDate.toDate()}
        onChange={(date) => setSelectedDate(moment.tz(date, timezone))}
        dateFormat="MMMM d, yyyy"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
      />
    </>
  );
}
