import React, { useState } from 'react';
import './input.css';
import { InputBlockProps } from './inputTypes';

const InputBlock = (props: InputBlockProps) => {
  const {
    id, setValue, label, type,
  } = props;

  const [inputValue, setInputValue] = useState('');
  const [isInputVisible, setIsInputVisible] = useState(false);

  if (type === 'password') {
    return (
      <>
        <input
          type={isInputVisible ? 'text' : 'password'}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
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
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
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
