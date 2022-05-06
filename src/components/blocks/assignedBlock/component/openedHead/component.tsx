import React from 'react';
import { OpenedHeadProps } from '../../../../../types';
import { BackImg } from '../../../../controls/images';

const OpenedHead = (props: OpenedHeadProps) => {
  const { handleOpen } = props;

  return (
    <div className="openedHead">
      <BackImg className="back" onClick={handleOpen} />
      <h4>Assignments</h4>
    </div>
  );
};

export default OpenedHead;
