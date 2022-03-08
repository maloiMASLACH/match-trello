import React from 'react';
import { HandleActive } from '../../../../../types/toggle';
import './styles.css';

const AddTablet = (props: HandleActive) => {
  const { handleActive } = props;

  return (
    <div className="addColonBlock">
      <p>Create new column</p>
      <img
        src="./plus.png"
        alt="add"
        className="addColonImg"
        onClick={handleActive}
        aria-hidden="true"
      />
    </div>
  );
};

export default AddTablet;
