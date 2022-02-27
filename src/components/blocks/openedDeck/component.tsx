import React, { useState } from 'react';
import { ColonType } from '../../../types/globalTypes';
import {
  onDragEnd,
  onDragLeave,
  onDragOver,
  onDragStart,
  onDropColon,
} from '../../../utils/dragEvents';
import Firebase, { FirebaseContext } from '../../../utils/fireBase';
import sortCards from '../../../utils/sortCards';
import NewColon from '../newColon';
import './styles.css';
import { OpenedDeckProps } from '../../../types/openedDeck';
import ChangeNameField from './components/changeNameField';
import Colon from './components/column';

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
                {!isChanging && deckName}
                {isChanging && (
                  <ChangeNameField
                    userState={userState}
                    setUserState={setUserState}
                    deckName={deckName}
                    setChanging={setChanging}
                    firebase={firebase}
                  />
                )}
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
