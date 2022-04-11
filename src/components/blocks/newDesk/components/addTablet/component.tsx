import React from 'react';
import { HandleActive } from '../../../../../types/toggle';
import ActiveImg from '../../../../controls/activeImg';
import './styles.css';

const AddTablet = (props: HandleActive) => {
  const { handleActive } = props;

  return (
    <div className="addBlock">
      <p>Create new desk</p>
      <ActiveImg
        src="./../plus.png"
        alt="add"
        className="addDeskImg"
        onClick={handleActive}
      />
    </div>
  );
};

export default AddTablet;
