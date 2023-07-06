import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { RiCalendar2Fill } from 'react-icons/ri';
import './Datepick.css';

const DatePick = ({ handleDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = (date) => {
    setSelectedDate(date);
    handleDateChange(date); // Call the prop function to notify parent component
  };

  return (
    <div className='date-picker-container'>
      <div className='date-picker-wrapper'>
        <RiCalendar2Fill className="calendar-icon" />
        <DatePicker
          selected={selectedDate}
          onChange={handleChange}
          placeholderText="dd/mm/yyyy"
          isClearable
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          dateFormat="dd/MM/yyyy"
          popperModifiers={{
            preventOverflow: {
              enabled: true,
              escapeWithReference: false,
              boundariesElement: 'viewport',
            },
          }}
          wrapperClassName="date-picker-wrapper"
          className="date-picker"
        />
      </div>
    </div>
  );
};

export default DatePick;
