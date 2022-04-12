import React from 'react';
import { HandleActive } from '../../../../../types/toggle';
import AddImg from '../../../../controls/images/add';
import './styles.css';

const AddTablet = (props: HandleActive) => {
  const { handleActive } = props;

  return (
    <div className="addBlock">
      <p>Create new desk</p>
      <AddImg className="addDeskImg" onClick={handleActive} />
    </div>
  );
};

export default AddTablet;
