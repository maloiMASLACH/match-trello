import React, { useState } from 'react';
import { User } from '../../constants/interfaces';
import OpenedDeck from '../openedDeck/openedDeck';
import './deckWithInfo.css';

interface DeckWithInfoProps{
  deckInfo:User
  deckName:string
  path:string
  userState: User
  setUserState: React.Dispatch<React.SetStateAction<User>>
}

const DeckWithInfo = function (props: DeckWithInfoProps) {
  const [isOpen, setOpenDeck] = useState <boolean>(false);
  const {
    deckInfo, deckName, path, userState, setUserState,
  } = props;
  let taskCount = 0;
  Object.keys(deckInfo).forEach(
    (colon) => { taskCount += Object.keys(deckInfo[colon as keyof User]).length; },
  );
  return (
    <>
      <div className="infoBlock" onClick={() => { setOpenDeck(true); }} aria-hidden="true">
        <h3>
          {deckName}
        </h3>
        <p>
          {Object.keys(deckInfo).length}
          {' '}
          colons
        </p>
        <p>
          {taskCount}
          {' '}
          tasks
        </p>
      </div>
      {isOpen
        ? (
          <OpenedDeck
            deckInfo={deckInfo}
            deckName={deckName}
            setOpenDeck={setOpenDeck}
            userState={userState}
            setUserState={setUserState}
          />
        )
        : null }
    </>
  );
};

export default DeckWithInfo;
