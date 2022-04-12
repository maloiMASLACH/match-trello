import React from 'react';
import './styles.css';
import '../../../../App.css';
import { ActiveImgProps } from '../../../../types/activeImg';

const RedactImg = (props: ActiveImgProps) => {
  const { src, alt, ...rest } = props;

  return <img {...rest} src="./../redact.png" alt="redact" aria-hidden="true" />;
};

export default RedactImg;
