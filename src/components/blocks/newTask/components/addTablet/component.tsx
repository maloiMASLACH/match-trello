import React from 'react';
import { AddTabletProps } from '../../../../../types/newTask';
import './styles.css';

const AddTablet = (props: AddTabletProps) => {
  const { setActive } = props;

  return (
    <div className="addTaskBlock">
      <p>Add task</p>
      <img
        src="./plus.png"
        alt="add"
        className="addTaskImg"
        onClick={() => setActive(true)}
        aria-hidden="true"
      />
    </div>
  );
};
export default AddTablet;
