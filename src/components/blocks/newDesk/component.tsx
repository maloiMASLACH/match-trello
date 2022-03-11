import React, { useState } from 'react';
import './styles.css';
import AddForm from './components/addForm';
import AddTablet from './components/addTablet';

const NewDesk = () => {
  const [isActive, setActive] = useState<boolean>(false);

  const handleActive = () => {
    setActive((prevState) => !prevState);
  };

  return isActive ? (
    <AddForm handleActive={handleActive} />
  ) : (
    <AddTablet handleActive={handleActive} />
  );
};

export default NewDesk;
