import React, { useState } from 'react';
import { NewColumnProps } from '../../../types';
import AddForm from './components/addForm';
import AddTablet from './components/addTablet';
import './styles.css';

const NewColumn = (props: NewColumnProps) => {
  const { uid } = props;

  const [isActive, setActive] = useState<boolean>(false);

  const handleActive = () => {
    setActive((prevState) => !prevState);
  };

  return isActive ? (
    <AddForm uid={uid} handleActive={handleActive} />
  ) : (
    <AddTablet handleActive={handleActive} />
  );
};

export default NewColumn;
