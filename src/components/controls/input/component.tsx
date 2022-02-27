import React, { useState } from 'react';
import './styles.css';
import { InputBlockProps } from '../../../types/input';

const InputBlock = (props: InputBlockProps) => {
  const {
    id, value, label, type, ...rest
  } = props;

  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <input
        value={value}
        {...rest}
        type={isVisible ? 'text' : type}
        id={id}
      />
      {(type === 'password') && (
        <i
          className="fa fa-eye"
          aria-hidden="true"
          onClick={() => setIsVisible(!isVisible)}
        />
      ) }
      <label htmlFor={id} className="active singInputText">
        { label }
        <input type="radio" />
      </label>
    </>
  );
};

export default InputBlock;
