import React from 'react';
import { HandleActive } from '../../../../../types/toggle';
import ActiveImg from '../../../../controls/activeImg';
import './styles.css';

const AddTablet = (props: HandleActive) => {
  const { handleActive } = props;

  return (
    <div className="addColonBlock">
      <p>Create new column</p>
      <ActiveImg
        src="./../plus.png"
        alt="add"
        className="addColonImg"
        onClick={handleActive}
      />
    </div>
  );
};

export default AddTablet;
