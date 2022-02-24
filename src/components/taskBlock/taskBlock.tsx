import React, { useState } from 'react';
import { TaskType, User } from '../../constants/interfaces';
import {
  onDragEnd,
  onDragLeave,
  onDragOver,
  onDragStart,
  onDropCard,
} from '../../utils/dragEvents';
import Firebase, { FirebaseContext } from '../../utils/fireBase';
import './taskBlock.css';

interface TaskProps {
  colonName: string;
  taskInfo: TaskType;
  deckName: string;
  userState: User;
  setUserState: React.Dispatch<React.SetStateAction<User>>;
  currentCard: TaskType | null;
  setCurrentCard: React.Dispatch<React.SetStateAction<TaskType | null>>;
}
interface ChangeNameFieldProps {
  userState: User;
  setUserState: React.Dispatch<React.SetStateAction<User>>;
  deckName: string;
  setChanging: React.Dispatch<React.SetStateAction<boolean>>;
  colonName: string;
  taskName: string;
  firebase: Firebase;
}
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

const Task = (props: TaskProps) => {
  const {
    deckName,
    colonName,
    taskInfo,
    userState,
    setUserState,
    currentCard,
    setCurrentCard,
  } = props;

  const [checked, setChecked] = useState<boolean>(taskInfo.completed);
  const [isChanging, setChanging] = useState<boolean>(false);
  const colonObj = colonName.split(' ').join('_');

  const setCompleted = (firebase: Firebase) => {
    const newState = userState;
    newState.decks[deckName as keyof User].colons[colonObj].tasks[
      taskInfo.taskName
    ].completed = !checked;

    setUserState(newState);
    setChecked(!checked);

    firebase.user(userState.uid.slice(1)).set(userState);
  };

  const deleteTask = (firebase: Firebase) => {
    const newDeck = userState;
    newDeck.decks[deckName].colons[colonObj].tasks[taskInfo.taskName] = null;
    setUserState(newDeck);

    firebase.user(userState.uid.slice(1)).set(userState);
  };

  return (
    <FirebaseContext.Consumer>
      {(firebase) => (
        <div
          className="task"
          onDragStart={() => {
            onDragStart(taskInfo, setCurrentCard);
          }}
          onDragLeave={(e) => onDragLeave(e)}
          onDragEnd={(e) => onDragEnd(e)}
          onDragOver={(e) => onDragOver(e)}
          onDrop={() => onDropCard(
            taskInfo,
            currentCard,
            deckName,
            colonObj,
            userState,
            firebase,
          )}
          draggable
        >
          {!isChanging ? (
            <>
              <p>{taskInfo.taskName}</p>
              <img
                src="./redact.png"
                className="taskRedact"
                alt="x"
                onClick={() => {
                  setChanging(!isChanging);
                }}
                aria-hidden="true"
              />
              <img
                className="taskDelete"
                alt="delete"
                src="./delete.png"
                onClick={() => deleteTask(firebase)}
                aria-hidden="true"
              />
              <input
                className="taskCheckBox"
                type="checkbox"
                checked={checked}
                id={taskInfo.taskName}
                onChange={() => setCompleted(firebase)}
              />
              <label htmlFor={taskInfo.taskName}>
                <input type="checkbox" id="rule" />
                <div id="tick_mark" />
              </label>
              <p>{taskInfo.date}</p>
            </>
          ) : (
            ''
          )}
          {isChanging ? (
            <ChangeNameField
              userState={userState}
              setUserState={setUserState}
              deckName={deckName}
              colonName={colonName}
              taskName={taskInfo.taskName}
              setChanging={setChanging}
              firebase={firebase}
            />
          ) : null}
        </div>
      )}
    </FirebaseContext.Consumer>
  );
};

export default Task;
