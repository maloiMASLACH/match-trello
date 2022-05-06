import React from 'react';
import { SelectProps } from '../../../types';
import './styles.css';

const Select = (props: SelectProps) => {
  const {
    values, ...rest
  } = props;

  return (
    <select
      {...rest}
    >
      {values.map((option) => (
        <option
          label={option}
          key={option}
          value={option}
          id={`${values.indexOf(option)}`}
        >
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
