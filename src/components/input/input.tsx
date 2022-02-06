import React, { useState } from 'react';
import './input.css';

interface InputBlockProps{
  id:string,
  parentRef:React.RefObject<HTMLInputElement>,
  label:string,
  type:string,
}

const InputBlock = function (props:InputBlockProps) {
  const {
    id, parentRef, label, type,
  } = props;
  const [inputValue, setInputValue] = useState('');
  const [isInputVisible, setIsInputVisible] = useState(false);
  if (type === 'password') {
    return (
      <>
        <input
          type={isInputVisible ? 'text' : 'password'}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          id={id}
          ref={parentRef}
        />
        <i className="fa fa-eye" aria-hidden="true" onClick={() => setIsInputVisible(!isInputVisible)} />
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
        onChange={(e) => setInputValue(e.target.value)}
        id={id}
        ref={parentRef}
      />
      <label htmlFor={id} className="active singInputText">
        {label}
        <input type="radio" />
      </label>
    </>
  );
};

export default InputBlock;
