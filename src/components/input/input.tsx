import React from 'react';
import './input.css';

interface InputBlockProps{
  id:string,
  ref:React.RefObject<HTMLInputElement>,
  label:string,
  type:string
}

const InputBlock = function (props:InputBlockProps) {
  const {
    id, ref, label, type,
  } = props;
  if (type === 'password') {
    const changeVis = function (e:React.MouseEvent) {
      console.log(e);
    };
    return (
      <>
        <input type={type} id={id} ref={ref} />
        <i className="fa fa-eye" aria-hidden="true" onClick={changeVis} />
        <label htmlFor={id} className="active singInputText">
          {label}
          <input type="radio" />
        </label>
      </>
    );
  }
  return (
    <>
      <input type={type} id={id} ref={ref} />
      <label htmlFor={id} className="active singInputText">
        {label}
        <input type="radio" />
      </label>
    </>
  );
};

export default InputBlock;
