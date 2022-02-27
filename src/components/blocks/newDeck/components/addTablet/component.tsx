import React from 'react';
import { AddTabletProps } from '../../../../../types/newDeck';
import './styles.css';

const AddTablet = (props: AddTabletProps) => {
  const { setActive } = props;
  return (
    <div className="addBlock">
      <p>Create new deck</p>
      <img
        src="./plus.png"
        alt="add"
        className="addDeckImg"
        onClick={() => setActive(true)}
        aria-hidden="true"
      />
    </div>
  );
};

export default AddTablet;
