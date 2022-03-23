import React, { useState } from 'react';
import './styles.css';
import { InputBlockProps } from '../../../types/input';

const InputBlock = (props: InputBlockProps) => {
  const {
    id, value, label, type, validation, ...rest
  } = props;

  const [isVisible, setIsVisible] = useState(false);
  const [touched, setTouched] = useState(false);

  const errorMessage = validation(value);

  return (
    <>
      <input value={value} {...rest} type={isVisible ? 'text' : type} placeholder={rest.placeholder} id={id} onFocus={() => setTouched(true)} />
      {type === 'password' && (
        <i
          className="fa fa-eye"
          aria-hidden="true"
          onClick={() => setIsVisible(!isVisible)}
        />
      )}
      <p>{touched && errorMessage}</p>
      <label htmlFor={id} className="active singInputText">
        {label}
        <input type="radio" />
      </label>
    </>
  );
};

export default InputBlock;
