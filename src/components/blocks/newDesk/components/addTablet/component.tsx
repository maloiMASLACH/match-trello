import React from 'react';
import { HandleActive } from '../../../../../types/toggle';
import './styles.css';

const AddTablet = (props: HandleActive) => {
  const { handleActive } = props;

  return (
    <div className="addBlock">
      <p>Create new desk</p>
      <img
        src="./../plus.png"
        alt="add"
        className="addDeskImg"
        onClick={handleActive}
        aria-hidden="true"
      />
    </div>
  );
};

export default AddTablet;
