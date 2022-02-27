import React, { useState } from 'react';
import './styles.css';
import { NewDeckProps } from '../../../types/newDeck';
import AddForm from './components/addForm';
import AddTablet from './components/addTablet';

const NewDeck = (props: NewDeckProps) => {
  const { userState, setUserState } = props;

  const [isActive, setActive] = useState<boolean>(false);

  if (isActive) {
    return (
      <AddForm
        setActive={setActive}
        userState={userState}
        setUserState={setUserState}
      />
    );
  }
  return <AddTablet setActive={setActive} />;
};

export default NewDeck;
