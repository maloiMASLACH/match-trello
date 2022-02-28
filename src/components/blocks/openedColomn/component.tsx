import React, { useState } from 'react';
import { TaskType } from '../../../types/globalTypes';
import Firebase, { FirebaseContext } from '../../../utils/fireBase';
import sortCards from '../../../utils/sortCards';
import NewTask from '../newTask';
import Task from '../taskBlock';
import './styles.css';
import { OpenedColumnProps } from '../../../types/openedColumn';
import ChangeNameField from './components/changeNameField';

const OpenedColumn = (props: OpenedColumnProps) => {
  const {
    column, deskName, userState, setUserState, setOpenColumn,
  } = props;

  const [isChanging, setChanging] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<TaskType | null>(null);

  const deleteColumn = (
    firebase: Firebase,
    setClose: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    const newDesk = userState;
    const columnName = column.columnName.split(' ').join('_');

    newDesk.desks[deskName].columns[columnName] = null;

    setUserState(newDesk);

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
              {!isChanging && column.columnName }
              {isChanging && (
                <ChangeNameField
                  userState={userState}
                  setUserState={setUserState}
                  deskName={deskName}
                  columnName={column.columnName}
                  setChanging={setChanging}
                  firebase={firebase}
                />
              )}
            </h3>
            <img
              src="./redact.png"
              className="deskDelete"
              alt="x"
              onClick={() => {
                setChanging(!isChanging);
              }}
              aria-hidden="true"
            />
            <img
              className="deskDelete"
              alt="delete"
              src="./delete.png"
              onClick={() => deleteColumn(firebase, setOpenColumn)}
              aria-hidden="true"
            />
            <img
              src="./x.png"
              alt="x"
              onClick={() => {
                setOpenColumn(false);
              }}
              aria-hidden="true"
            />
          </div>
        )}
      </FirebaseContext.Consumer>
      <div className="tasks">
        {column.tasks
          ? Object.values(column.tasks)
            .sort(sortCards)
            .map((task: TaskType) => (
              <Task
                deskName={deskName}
                columnName={column.columnName}
                taskInfo={task}
                userState={userState}
                setUserState={setUserState}
                currentCard={currentTask}
                setCurrentCard={setCurrentTask}
              />
            ))
          : null}
        <NewTask
          deskName={deskName}
          columnName={column.columnName}
          userState={userState}
          setUserState={setUserState}
        />
      </div>
    </div>
  );
};

export default OpenedColumn;
