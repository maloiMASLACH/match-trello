import React, { useState } from 'react';
import './styles.css';
import { InputBlockProps } from './types';

const InputBlock = (props: InputBlockProps) => {
  const {
    id, value, onChange, label, type, ...rest
  } = props;

  const [isInputVisible, setIsInputVisible] = useState(false);

  return (
    <>
      <input
        type={(type === 'password') ? (isInputVisible ? 'text' : 'password') : 'text'}
        value={value}
        onChange={(e) => onChange(e)}
        id={id}
        {...rest}
      />
      {(type === 'password') ? (
        <i
          className="fa fa-eye"
          aria-hidden="true"
          onClick={() => setIsInputVisible(!isInputVisible)}
        />
      ) : null }
      <label htmlFor={id} className="active singInputText">
        {label}
        <input type="radio" />
      </label>
    </>
  );
};

export default InputBlock;
