import React, { useState } from 'react';
import { TextAreaProps } from '../../../types/textAreaBlock';
import './styles.css';

const TextArea = (props: TextAreaProps) => {
  const {
    id, value, validation, ...rest
  } = props;

  const [touched, setTouched] = useState(false);

  const errorMessage = validation(value);

  return (
    <>
      <textarea
        value={value}
        {...rest}
        placeholder={rest.placeholder}
        id={id}
        onBlur={() => setTouched(true)}
      />
      <p>{touched && errorMessage}</p>
    </>
  );
};

export default TextArea;
