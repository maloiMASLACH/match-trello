import React, { useState } from 'react';
import { User } from '../../constants/interfaces';
import NewColon from '../newColon/newColon';
import OpenedColon from '../openedColon/openedColon';
import './openedDeck.css';

interface OpenedDeckProps{
  deckInfo:User
  deckName:string
  setOpenDeck:React.Dispatch<React.SetStateAction<boolean>>
  userState: User
  setUserState: React.Dispatch<React.SetStateAction<User>>
}
interface ColonProps{
  colon:string
  deckInfo:User
  deckName:string
  userState: User
  setUserState: React.Dispatch<React.SetStateAction<User>>
}

const Colon = function (props:ColonProps) {
  const {
    colon, deckInfo, deckName, userState, setUserState,
  } = props;
  const [isOpenColon, setOpenColon] = useState <boolean>(false);
  return (
    <>
      <div className="colon" onClick={() => { setOpenColon(true); }} aria-hidden="true">
        <h4>{colon}</h4>
        <p>
          {Object.keys(deckInfo[colon as keyof User]).length}
          {' '}
          task(s)
        </p>
      </div>
      {isOpenColon
        ? (
          <OpenedColon
            colon={colon}
            colonInfo={deckInfo[colon as keyof User]}
            deckName={deckName}
            userState={userState}
            setUserState={setUserState}
            setOpenColon={setOpenColon}
          />
        )
        : null }
    </>
  );
};

const OpenedDeck = function (props: OpenedDeckProps) {
  const {
    deckInfo, deckName, setOpenDeck, userState, setUserState,
  } = props;
  console.log(deckInfo, userState);
  return (
    <div className="openedDeckBlock">
      <div className="openedDeckBlockHead">
        <h3>
          {deckName}
        </h3>
        <img src="./x.png" alt="x" onClick={() => { setOpenDeck(false); }} aria-hidden="true" />
      </div>
      <div className="colons">
        {Object.keys(deckInfo).map((colon) => (
          <Colon
            colon={colon}
            deckInfo={deckInfo}
            deckName={deckName}
            userState={userState}
            setUserState={setUserState}
          />
        ))}
        <NewColon
          deckName={deckName}
          userState={userState}
          setUserState={setUserState}
        />
      </div>
    </div>
  );
};

export default OpenedDeck;
