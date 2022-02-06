import React, { useState } from 'react';
import { User } from '../../constants/interfaces';
import Firebase, { FirebaseContext } from '../../utils/fireBase';
import NewTask from '../newTask/newTask';
import './openedColon.css';

interface OpenedColonProps{
  colon:string
  colonInfo:any
  deckName:string
  userState: User
  setUserState: React.Dispatch<React.SetStateAction<User>>
  setOpenColon:React.Dispatch<React.SetStateAction<boolean>>
}
interface TaskProps{
  colon:string
  taskInfo:any
  deckName:string
  userState: User
  setUserState: React.Dispatch<React.SetStateAction<User>>
}

const Task = function (props:TaskProps) {
  const {
    deckName, colon, taskInfo, userState, setUserState,
  } = props;
  const [checked, setChecked] = useState<boolean>(taskInfo.completed);

  const setCompleted = function (firebase:Firebase) {
    const newState = userState;
    newState.decks[deckName as keyof User][colon][taskInfo.taskName].completed = !checked;
    setUserState(newState);
    firebase.user(userState.uid.slice(1)).set(userState).then(() => {
      setChecked(!checked);
    });
  };

  return (
    <FirebaseContext.Consumer>
      {(firebase) => (
        <div className="task">
          <p>{taskInfo.taskName}</p>
          <input className="taskCheckBox" type="checkbox" checked={checked} id={taskInfo.taskName} onClick={() => setCompleted(firebase)} />
          <label htmlFor={taskInfo.taskName}>
            <input type="checkbox" id="rule" />
            <div id="tick_mark" />
          </label>
          <p>{taskInfo.date}</p>
        </div>
      )}

    </FirebaseContext.Consumer>
  );
};

const OpenedColon = function (props: OpenedColonProps) {
  const {
    colon, colonInfo, deckName, userState, setUserState, setOpenColon,
  } = props;
  console.log(colonInfo);
  return (
    <div className="openedColonBlock">
      <div className="openedColonBlockHead">
        <h3>
          {colon}
        </h3>
        <img src="./x.png" alt="x" onClick={() => { setOpenColon(false); }} aria-hidden="true" />
      </div>
      <div className="tasks">
        {Object.keys(colonInfo).map((task) => (
          <Task
            deckName={deckName}
            colon={colon}
            taskInfo={colonInfo[task]}
            userState={userState}
            setUserState={setUserState}
          />
        ))}
        <NewTask
          deckName={deckName}
          colon={colon}
          userState={userState}
          setUserState={setUserState}
        />
      </div>
    </div>
  );
};

export default OpenedColon;
