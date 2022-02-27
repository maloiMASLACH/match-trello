import React from 'react';
import { AddTabletProps } from '../../../../../types/newDesk';
import './styles.css';

const AddTablet = (props: AddTabletProps) => {
  const { setActive } = props;
  return (
    <div className="addBlock">
      <p>Create new desk</p>
      <img
        src="./plus.png"
        alt="add"
        className="addDeskImg"
        onClick={() => setActive(true)}
        aria-hidden="true"
      />
    </div>
  );
};

export default AddTablet;
