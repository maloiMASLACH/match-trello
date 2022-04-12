import React from 'react';
import { HandleActive } from '../../../../../types/toggle';
import AddImg from '../../../../controls/images/add';
import './styles.css';

const AddTablet = (props: HandleActive) => {
  const { handleActive } = props;

  return (
    <div className="addColonBlock">
      <p>Create new column</p>
      <AddImg className="addColonImg" onClick={handleActive} />
    </div>
  );
};

export default AddTablet;
