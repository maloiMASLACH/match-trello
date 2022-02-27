import React, { useState } from 'react';
import { ColonProps } from '../../../../../types/openedDeck';
import {
  onDragStart, onDragLeave, onDragEnd, onDragOver, onDropColon,
} from '../../../../../utils/dragEvents';
import './styles.css';
import OpenedColon from '../../../openedColomn/component';

const Colon = (props: ColonProps) => {
  const {
    colon,
    deckName,
    userState,
    setUserState,
    currentCard,
    setCurrentCard,
    firebase,
  } = props;

  const [isOpenColon, setOpenColon] = useState<boolean>(false);

  let taskLength = 0;

  if (colon.tasks) {
    taskLength = Object.keys(colon.tasks).length;
  }

  return (
    <>
      <div
        onDragStart={() => {
          onDragStart(colon, setCurrentCard);
        }}
        onDragLeave={(e) => onDragLeave(e)}
        onDragEnd={(e) => onDragEnd(e)}
        onDragOver={(e) => onDragOver(e)}
        onDrop={() => onDropColon(colon, currentCard, deckName, userState, firebase)}
        draggable
        className="colon"
        onClick={() => {
          setOpenColon(true);
        }}
        aria-hidden="true"
      >
        <h4>{colon.colonName}</h4>
        <p>
          {taskLength}
          {' '}
          task(s)
        </p>
      </div>
      {isOpenColon && (
        <OpenedColon
          colon={colon}
          deckName={deckName}
          userState={userState}
          setUserState={setUserState}
          setOpenColon={setOpenColon}
        />
      )}
    </>
  );
};

export default Colon;
