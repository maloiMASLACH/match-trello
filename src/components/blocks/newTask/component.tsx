import React, { useState } from 'react';
import './styles.css';
import { NewTaskProps } from '../../../types/newTask';
import AddForm from './components/addForm';
import AddTablet from './components/addTablet';

const NewTask = (props: NewTaskProps) => {
  const {
    userState, setUserState, deskName, columnName,
  } = props;

  const [isActive, setActive] = useState<boolean>(false);

  if (isActive) {
    return (
      <AddForm
        setActive={setActive}
        userState={userState}
        setUserState={setUserState}
        deskName={deskName}
        columnName={columnName}
      />
    );
  }
  return <AddTablet setActive={setActive} />;
};

export default NewTask;