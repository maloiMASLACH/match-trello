import React, { useState } from 'react';
import './styles.css';
import AddForm from './components/addForm';
import AddTablet from './components/addTablet';

const NewTask = () => {
  const [isActive, setActive] = useState<boolean>(false);

  const handleActive = () => {
    setActive((prevState) => !prevState);
  };

  if (isActive) {
    return <AddForm handleActive={handleActive} />;
  }
  return <AddTablet handleActive={handleActive} />;
};

export default NewTask;
