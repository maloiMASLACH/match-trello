import React, { useState } from 'react';
import { ColonType } from '../../../types/globalTypes';
import OpenedDeck from '../openedDeck';
import './styles.css';
import { DeckWithInfoProps } from '../../../types/deckWithInfo';

const DeckWithInfo = (props: DeckWithInfoProps) => {
  const [isOpen, setOpenDeck] = useState<boolean>(false);

  const {
    deckInfo, deckName, userState, setUserState,
  } = props;

  let taskCount = 0;

  if (deckInfo.colons) {
    Object.values(deckInfo.colons).forEach((colon: ColonType) => {
      if (colon.tasks) {
        taskCount += Object.keys(colon.tasks).length;
      }
    });
  }

  return (
    <>
      <div
        className="infoBlock"
        onClick={() => {
          setOpenDeck(true);
        }}
        aria-hidden="true"
      >
        <h3>{deckName}</h3>
        <p>
          {`${deckInfo.colons ? Object.keys(deckInfo.colons).length : 0} columns`}
        </p>
        <p>
          {`${taskCount} tasks`}
        </p>
      </div>
      {isOpen && (
        <OpenedDeck
          deckInfo={deckInfo}
          deckName={deckName}
          setOpenDeck={setOpenDeck}
          userState={userState}
          setUserState={setUserState}
        />
      ) }
    </>
  );
};

export default DeckWithInfo;
