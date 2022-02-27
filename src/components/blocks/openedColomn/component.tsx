import React, { useState } from 'react';
import { TaskType } from '../../../types/globalTypes';
import Firebase, { FirebaseContext } from '../../../utils/fireBase';
import sortCards from '../../../utils/sortCards';
import NewTask from '../newTask';
import Task from '../taskBlock';
import './styles.css';
import { OpenedColonProps } from '../../../types/openedColumn';
import ChangeNameField from './components/changeNameField';

const OpenedColon = (props: OpenedColonProps) => {
  const {
    colon, deckName, userState, setUserState, setOpenColon,
  } = props;

  const [isChanging, setChanging] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<TaskType | null>(null);

  const deleteColon = (
    firebase: Firebase,
    setClose: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    const newDeck = userState;
    const colonName = colon.colonName.split(' ').join('_');

    newDeck.decks[deckName].colons[colonName] = null;

    setUserState(newDeck);

    firebase
      .user(userState.uid.slice(1))
      .set(userState)
      .then(() => {
        setClose(false);
      });
  };

  return (
    <div className="openedColonBlock">
      <FirebaseContext.Consumer>
        {(firebase) => (
          <div className="openedColonBlockHead">
            <h3>
              {!isChanging && colon.colonName }
              {isChanging && (
                <ChangeNameField
                  userState={userState}
                  setUserState={setUserState}
                  deckName={deckName}
                  colonName={colon.colonName}
                  setChanging={setChanging}
                  firebase={firebase}
                />
              )}
            </h3>
            <img
              src="./redact.png"
              className="deckDelete"
              alt="x"
              onClick={() => {
                setChanging(!isChanging);
              }}
              aria-hidden="true"
            />
            <img
              className="deckDelete"
              alt="delete"
              src="./delete.png"
              onClick={() => deleteColon(firebase, setOpenColon)}
              aria-hidden="true"
            />
            <img
              src="./x.png"
              alt="x"
              onClick={() => {
                setOpenColon(false);
              }}
              aria-hidden="true"
            />
          </div>
        )}
      </FirebaseContext.Consumer>
      <div className="tasks">
        {colon.tasks
          ? Object.values(colon.tasks)
            .sort(sortCards)
            .map((task: TaskType) => (
              <Task
                deckName={deckName}
                colonName={colon.colonName}
                taskInfo={task}
                userState={userState}
                setUserState={setUserState}
                currentCard={currentTask}
                setCurrentCard={setCurrentTask}
              />
            ))
          : null}
        <NewTask
          deckName={deckName}
          colonName={colon.colonName}
          userState={userState}
          setUserState={setUserState}
        />
      </div>
    </div>
  );
};

export default OpenedColon;
