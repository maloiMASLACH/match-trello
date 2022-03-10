import React, { useState } from 'react';
import AddForm from './components/addForm';
import './styles.css';
import AddTablet from './components/addTablet';
import { NewColumnProps } from '../../../types/newColumn';

const NewColumn = (props: NewColumnProps) => {
  const { uid } = props;

  const [isActive, setActive] = useState<boolean>(false);

  const handleActive = () => {
    setActive((prevState) => !prevState);
  };

  if (isActive) {
    return <AddForm uid={uid} handleActive={handleActive} />;
  }
  return <AddTablet handleActive={handleActive} />;
};

export default NewColumn;
