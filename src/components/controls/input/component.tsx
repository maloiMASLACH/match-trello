import React, { useState } from 'react';
import './styles.css';
import { InputBlockProps } from '../../../types';

const InputBlock = (props: InputBlockProps) => {
  const {
    id, value, type, label, validation, ...rest
  } = props;

  const [isVisible, setIsVisible] = useState(false);
  const [touched, setTouched] = useState(false);

  const errorMessage = validation(value);

  const handleChanging = () => {
    setIsVisible((prevState) => !prevState);
  };

  return (
    <>
      <input
        value={value}
        {...rest}
        type={isVisible ? 'text' : type}
        placeholder={rest.placeholder}
        id={id}
        onBlur={() => setTouched(true)}
      />
      {type === 'password' && (
        <i className="fa fa-eye" aria-hidden="true" onClick={handleChanging} />
      )}
      <p>{touched && errorMessage}</p>
      {label && (
      <label htmlFor={id} className="active singInputText">
        {label}
        <input type="radio" />
      </label>
      )}
    </>
  );
};

export default InputBlock;
