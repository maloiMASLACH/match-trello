import React from 'react';
import './styles.css';
import '../../../../App.css';
import { ActiveImgProps } from '../../../../types/activeImg';

const BackImg = (props: ActiveImgProps) => {
  const { src, alt, ...rest } = props;

  return <img {...rest} src="./../back.png" alt="add" aria-hidden="true" />;
};

export default BackImg;
