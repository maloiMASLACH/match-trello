import React, { useState } from 'react';
import { NewTaskProps } from '../../../types';
import AddForm from './components/addForm';
import AddTablet from './components/addTablet';
import './styles.css';

const NewTask = (props: NewTaskProps) => {
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

export default NewTask;
