/* eslint-disable react/button-has-type */
import React from 'react';
import './styles.css';
import '../../../App.css';
import { ActiveImgProps } from '../../../types/activeImg';

const ActiveImg = (props: ActiveImgProps) => {
  const { src, alt, ...rest } = props;

  return <img {...rest} src={src} alt={alt} aria-hidden="true" />;
};

export default ActiveImg;
