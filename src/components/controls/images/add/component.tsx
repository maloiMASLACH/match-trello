import React from 'react';
import './styles.css';
import '../../../../App.css';
import { ActiveImgProps } from '../../../../types';

const AddImg = (props: ActiveImgProps) => {
  const { src, alt, ...rest } = props;

  return <img {...rest} src="./../plus.png" alt="add" aria-hidden="true" />;
};

export default AddImg;
