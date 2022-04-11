import React from 'react';
import { HandleActive } from '../../../../../types/toggle';
import ActiveImg from '../../../../controls/activeImg';
import './styles.css';

const AddTablet = (props: HandleActive) => {
  const { handleActive } = props;

  return (
    <div className="addTaskBlock">
      <p>Add task</p>
      <ActiveImg
        src="./../plus.png"
        alt="add"
        className="addTaskImg"
        onClick={handleActive}
      />
    </div>
  );
};

export default AddTablet;
