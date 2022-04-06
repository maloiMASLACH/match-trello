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
    </>
  );
};

export default InputBlock;
