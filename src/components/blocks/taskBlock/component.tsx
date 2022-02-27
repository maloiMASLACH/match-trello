import React, { useState } from 'react';
import { User } from '../../../types/globalTypes';
import {
  onDragEnd,
  onDragLeave,
  onDragOver,
  onDragStart,
  onDropCard,
} from '../../../utils/dragEvents';
import Firebase, { FirebaseContext } from '../../../utils/fireBase';
import './styles.css';
import { TaskProps } from '../../../types/taskBlock';
import ChangeNameField from './components/changeNameField';

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
          {!isChanging && (
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
