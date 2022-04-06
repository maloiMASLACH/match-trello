import React from 'react';
import './styles.css';
import { SelectProps } from '../../../types/select';

const Select = (props: SelectProps) => {
  const {
    values, selected, ...rest
  } = props;

  return (
    <select
      {...rest}
      defaultValue={selected}
    >
      {values.map((option) => (
        <option
          key={option}
          value={option}
        >
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
