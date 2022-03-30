import React from 'react';
import './styles.css';
import { SelectProps } from '../../../types/select';

const Select = (props: SelectProps) => {
  const {
    values, handleChange, selected, ...rest
  } = props;

  return (
    <select
      {...rest}
      onChange={handleChange}
    >
      {values.map((theme) => (
        <option
          key={theme}
          selected={selected === theme}
          value={theme}
        >
          {theme}
        </option>
      ))}
    </select>
  );
};

export default Select;
