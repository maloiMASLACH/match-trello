import React, { useState } from 'react';
import AddForm from './components/addForm';
import './styles.css';
import AddTablet from './components/addTablet';

const NewColumn = () => {
  const [isActive, setActive] = useState<boolean>(false);

  const handleActive = () => {
    setActive((prevState) => !prevState);
  };

  if (isActive) {
    return <AddForm handleActive={handleActive} />;
  }
  return <AddTablet handleActive={handleActive} />;
};

export default NewColumn;
