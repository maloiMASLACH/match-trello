import React from 'react';
import { HandleActive } from '../../../../../types/toggle';
import './styles.css';

const AddTablet = (props: HandleActive) => {
  const { handleActive } = props;

  return (
    <div className="addTaskBlock">
      <p>Add task</p>
      <img
        src="./plus.png"
        alt="add"
        className="addTaskImg"
        onClick={() => handleActive()}
        aria-hidden="true"
      />
    </div>
  );
};
export default AddTablet;
