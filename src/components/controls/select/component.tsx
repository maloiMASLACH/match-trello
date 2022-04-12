import React from 'react';
import './styles.css';
import { SelectProps } from '../../../types/select';

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
