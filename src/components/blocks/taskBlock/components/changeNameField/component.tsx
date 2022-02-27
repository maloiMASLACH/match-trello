import React, { useState } from 'react';
import { ChangeNameFieldProps } from '../../../../../types/taskBlock';

const ChangeNameField = (props: ChangeNameFieldProps) => {
  const {
    userState,
    setUserState,
    deckName,
    colonName,
    taskName,
    setChanging,
    firebase,
  } = props;

  const colonObj = colonName.split(' ').join('_');

  const renameDeck = (name: string, date: string) => {
    const newDeck = userState;
    newDeck.decks[deckName]
      .colons[colonObj].tasks[name] = newDeck.decks[deckName].colons[colonObj].tasks[taskName];
    newDeck.decks[deckName].colons[colonObj].tasks[name].date = date;
    newDeck.decks[deckName].colons[colonObj].tasks[name].taskName = name;

    newDeck.decks[deckName].colons[colonObj].tasks[taskName] = null;

    setUserState(newDeck);

    firebase
      .user(userState.uid.slice(1))
      .set(userState)
      .then(() => {
        setChanging(false);
      });
  };
  const [inputName, setInputName] = useState('');
  const [inputDate, setInputDate] = useState('');

  return (
    <>
      <input
        className="newTaskName"
        type="text"
        value={inputName}
        placeholder="Task"
        onChange={(e) => setInputName(e.target.value)}
      />
      <input
        className="newTaskName"
        type="text"
        value={inputDate}
        placeholder="Date"
        onChange={(e) => setInputDate(e.target.value)}
      />
      <button
        className="taskRedactSubmit"
        type="submit"
        onClick={() => renameDeck(inputName, inputDate)}
      >
        OK
      </button>
    </>
  );
};

export default ChangeNameField;
