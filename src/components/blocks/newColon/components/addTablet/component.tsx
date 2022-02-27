import React from 'react';
import { AddTabletProps } from '../../../../../types/newColon';
import './styles.css';

const AddTablet = (props: AddTabletProps) => {
  const { setActive } = props;

  return (
    <div className="addColonBlock">
      <p>Create new colon</p>
      <img
        src="./plus.png"
        alt="add"
        className="addColonImg"
        onClick={() => setActive(true)}
        aria-hidden="true"
      />
    </div>
  );
};

export default AddTablet;
