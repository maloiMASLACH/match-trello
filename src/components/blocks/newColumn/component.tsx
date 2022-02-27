import React, { useState } from 'react';
import { NewColumnProps } from '../../../types/newColumn';
import AddForm from './components/addForm';
import './styles.css';
import AddTablet from './components/addTablet';

const NewColumn = (props: NewColumnProps) => {
  const { userState, setUserState, deskName } = props;

  const [isActive, setActive] = useState<boolean>(false);

  if (isActive) {
    return (
      <AddForm
        setActive={setActive}
        userState={userState}
        setUserState={setUserState}
        deskName={deskName}
      />
    );
  }
  return <AddTablet setActive={setActive} />;
};

export default NewColumn;
