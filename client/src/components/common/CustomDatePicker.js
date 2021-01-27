import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomDatePicker = ({ name, value, onChange, className, placeholder }) => {
  return (
    <DatePicker
      className={className}
      placeholder={placeholder}
      selected={(value && new Date(value)) || null}
      onChange={val => {
        onChange(name, val);
      }}
    />
  );
};

export default CustomDatePicker;
