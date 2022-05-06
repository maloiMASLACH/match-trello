import React, { useState } from 'react';
import { TextAreaProps } from '../../../types';
import './styles.css';

const TextArea = (props: TextAreaProps) => {
  const {
    value, validation, ...rest
  } = props;

  const [touched, setTouched] = useState(false);

  const errorMessage = validation(value);

  return (
    <>
      <textarea
        value={value}
        {...rest}
        onBlur={() => setTouched(true)}
      />
      <p>{touched && errorMessage}</p>
    </>
  );
};

export default TextArea;
