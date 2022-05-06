import React from 'react';
import './styles.css';
import '../../../../App.css';
import { ActiveImgProps } from '../../../../types';

const CloseImg = (props: ActiveImgProps) => {
  const { src, alt, ...rest } = props;

  return <img {...rest} src="./../x.png" alt="x" aria-hidden="true" />;
};

export default CloseImg;
