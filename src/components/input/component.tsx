import React, { useState } from 'react';
import './styles.css';
import { InputBlockProps } from './types';

const InputBlock = (props: InputBlockProps) => {
  const {
    id, value, setValue, label, type,
  } = props;

  const [isInputVisible, setIsInputVisible] = useState(false);

  if (type === 'password') {
    return (
      <>
        <input
          type={isInputVisible ? 'text' : 'password'}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          id={id}
        />
        <i
          className="fa fa-eye"
          aria-hidden="true"
          onClick={() => setIsInputVisible(!isInputVisible)}
        />
        <label htmlFor={id} className="active singInputText">
          {label}
          <input type="radio" />
        </label>
      </>
    );
  }
  return (
    <>
      <input
        type={type}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        id={id}
      />
      <label htmlFor={id} className="active singInputText">
        {label}
        <input type="radio" />
      </label>
    </>
  );
};

export default InputBlock;
