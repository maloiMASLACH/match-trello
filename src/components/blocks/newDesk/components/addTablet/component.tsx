import React from 'react';
import { HandleActive } from '../../../../../types';
import { AddImg } from '../../../../controls/images';
import './styles.css';

const AddTablet = (props: HandleActive) => {
  const { handleActive } = props;

  return (
    <div className="addBlock">
      <div className="addTablet">
        <p>Create new desk</p>
        <AddImg className="addDeskImg" onClick={handleActive} />
      </div>
    </div>
  );
};

export default AddTablet;
