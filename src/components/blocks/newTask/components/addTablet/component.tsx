import React from 'react';
import { HandleActive } from '../../../../../types/toggle';
import AddImg from '../../../../controls/images/add';
import './styles.css';

const AddTablet = (props: HandleActive) => {
  const { handleActive } = props;

  return (
    <div className="addTaskBlock">
      <p>Add task</p>
      <AddImg
        src="./../plus.png"
        alt="add"
        className="addTaskImg"
        onClick={handleActive}
      />
    </div>
  );
};

export default AddTablet;
