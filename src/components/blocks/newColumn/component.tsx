import React, { useState } from 'react';
import { NewColumnProps } from '../../../types/newColumn';
import AddForm from './components/addForm';
import './styles.css';
import AddTablet from './components/addTablet';

const NewColumn = (props: NewColumnProps) => {
  const { userState, setUserState, deskName } = props;

  const [isActive, setActive] = useState<boolean>(false);

  const handleActive = () => {
    setActive((prevState) => !prevState);
  };

  if (isActive) {
    return (
      <AddForm
        handleActive={handleActive}
        userState={userState}
        setUserState={setUserState}
        deskName={deskName}
      />
    );
  }
  return <AddTablet setActive={setActive} />;
};

export default NewColumn;
