import React from 'react';

const CustomDropDown = ({ name, value, onChange, className, style, children }) => {
  return (
    <select
      name={name}
      className={className}
      value={value}
      style={style}
      onChange={val => {
        onChange(name, val);
      }}
    >
      { children }
    </select>
  );
};

export default CustomDropDown;
