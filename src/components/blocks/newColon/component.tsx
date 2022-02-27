import React, { useState } from 'react';
import { NewColonProps } from '../../../types/newColon';
import AddForm from './components/addForm';
import './styles.css';
import AddTablet from './components/addTablet';

const NewColon = (props: NewColonProps) => {
  const { userState, setUserState, deckName } = props;

  const [isActive, setActive] = useState<boolean>(false);

  if (isActive) {
    return (
      <AddForm
        setActive={setActive}
        userState={userState}
        setUserState={setUserState}
        deckName={deckName}
      />
    );
  }
  return <AddTablet setActive={setActive} />;
};

export default NewColon;
