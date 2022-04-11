import React, { useState } from 'react';
import './styles.css';
import AddForm from './components/addForm';
import AddTablet from './components/addTablet';
import { NewTaskProps } from '../../../types/newTask';

const NewTask = (props: NewTaskProps) => {
  const { uid, deskObjId } = props;

  const [isActive, setActive] = useState<boolean>(false);

  const handleActive = () => {
    setActive((prevState) => !prevState);
  };

  return isActive ? (
    <AddForm uid={uid} deskObjId={deskObjId} handleActive={handleActive} />
  ) : (
    <AddTablet handleActive={handleActive} />
  );
};

export default NewTask;
