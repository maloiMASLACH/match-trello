import React from 'react';
import { HandleActive } from '../../../../../types';
import { AddImg } from '../../../../controls/images';
import './styles.css';

const AddTablet = (props: HandleActive) => {
  const { handleActive } = props;

  return (
    <div className="addTaskBlock">
      <div className="addTablet" onClick={handleActive} aria-hidden="true">
        <p>Add task</p>
        <AddImg src="./../plus.png" alt="add" className="addTaskImg" />
      </div>
    </div>
  );
};

export default AddTablet;
