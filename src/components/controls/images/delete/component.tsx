import React from 'react';
import './styles.css';
import '../../../../App.css';
import { ActiveImgProps } from '../../../../types/activeImg';

const DeleteImg = (props: ActiveImgProps) => {
  const { src, alt, ...rest } = props;

  return <img {...rest} src="./../delete.png" alt="delete" aria-hidden="true" />;
};

export default DeleteImg;
