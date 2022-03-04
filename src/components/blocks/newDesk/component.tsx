import React, { useState } from 'react';
import './styles.css';
import { NewDeskProps } from '../../../types/newDesk';
import AddForm from './components/addForm';
import AddTablet from './components/addTablet';

const NewDesk = (props: NewDeskProps) => {
  const { userState, setUserState } = props;

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
      />
    );
  }
  return <AddTablet setActive={setActive} />;
};

export default NewDesk;
