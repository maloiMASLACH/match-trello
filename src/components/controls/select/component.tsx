import React from 'react';
import './styles.css';
import { SelectProps } from '../../../types/select';

const Select = (props: SelectProps) => {
  const {
    id, values, onChange, selected,
  } = props;

  return (
    <select
      id={id}
      onChange={(e) => { onChange(e.target.value); }}
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
