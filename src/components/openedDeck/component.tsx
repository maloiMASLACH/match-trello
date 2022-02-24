import React, { useState } from 'react';
import { ColonType } from '../../constants/interfaces';
import {
  onDragEnd,
  onDragLeave,
  onDragOver,
  onDragStart,
  onDropColon,
} from '../../utils/dragEvents';
import Firebase, { FirebaseContext } from '../../utils/fireBase';
import sortCards from '../../utils/sortCards';
import NewColon from '../newColon';
import OpenedColon from '../openedColon';
import './styles.css';
import { ColonProps, ChangeNameFieldProps, OpenedDeckProps } from './types';

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
      {isOpenColon ? (
        <OpenedColon
          colon={colon}
          deckName={deckName}
          userState={userState}
          setUserState={setUserState}
          setOpenColon={setOpenColon}
        />
      ) : null}
    </>
  );
};

const ChangeNameField = (props: ChangeNameFieldProps) => {
  const {
    userState, setUserState, deckName, setChanging, firebase,
  } = props;

  const renameDeck = (inputValue: string) => {
    const newDeck = userState;
    const newDeckName = inputValue.split(' ').join('_');
    newDeck.decks[newDeckName] = newDeck.decks[deckName];

    newDeck.decks[deckName] = null;

    setUserState(newDeck);

    firebase
      .user(userState.uid.slice(1))
      .set(userState)
      .then(() => {
        setChanging(false);
      });
  };

  const [inputValue, setInputValue] = useState('');

  return (
    <>
      <input
        className="newDeckName"
        type="text"
        value={inputValue}
        placeholder="New deck name"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        className="newDeckNameSubmit"
        type="submit"
        onClick={() => renameDeck(inputValue)}
      >
        OK
      </button>
    </>
  );
};

const OpenedDeck = (props: OpenedDeckProps) => {
  const {
    deckInfo, deckName, setOpenDeck, userState, setUserState,
  } = props;

  const [isChanging, setChanging] = useState<boolean>(false);
  const [currentColon, setCurrentColon] = useState<ColonType | null>(null);

  const deleteDeck = (
    firebase: Firebase,
    setCloseDeck: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    const newDeck = userState;
    newDeck.decks[deckName] = null;

    setUserState(newDeck);

    firebase
      .user(userState.uid.slice(1))
      .set(userState)
      .then(() => {
        setCloseDeck(false);
      });
  };

  return (
    <div className="openedDeckBlock">
      <FirebaseContext.Consumer>
        {(firebase) => (
          <>
            <div className="openedDeckBlockHead">
              <h3>
                {!isChanging ? deckName : ''}
                {isChanging ? (
                  <ChangeNameField
                    userState={userState}
                    setUserState={setUserState}
                    deckName={deckName}
                    setChanging={setChanging}
                    firebase={firebase}
                  />
                ) : null}
              </h3>
              <img
                className="deckDelete"
                src="./redact.png"
                alt="redact"
                onClick={() => {
                  setChanging(!isChanging);
                }}
                aria-hidden="true"
              />
              <img
                className="deckDelete"
                alt="delete"
                src="./delete.png"
                onClick={() => deleteDeck(firebase, setOpenDeck)}
                aria-hidden="true"
              />
              <img
                src="./x.png"
                alt="x"
                onClick={() => {
                  setOpenDeck(false);
                }}
                aria-hidden="true"
              />
            </div>
            <div className="colons">
              {deckInfo.colons
                ? Object.values(deckInfo.colons)
                  .sort(sortCards)
                  .map((colon: ColonType) => (
                    <Colon
                      colon={colon}
                      deckName={deckName}
                      userState={userState}
                      setUserState={setUserState}
                      currentCard={currentColon}
                      setCurrentCard={setCurrentColon}
                      firebase={firebase}
                    />
                  ))
                : null}
              <NewColon
                deckName={deckName}
                userState={userState}
                setUserState={setUserState}
              />
            </div>
          </>
        )}
      </FirebaseContext.Consumer>
    </div>
  );
};

export default OpenedDeck;
