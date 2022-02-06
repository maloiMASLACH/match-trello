import React, { useState } from 'react';
import { User } from '../../constants/interfaces';
import Firebase, { FirebaseContext } from '../../utils/fireBase';
import './taskBlock.css';

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
  const [checked, setChecked] = useState<boolean>(taskInfo.completed || false);

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

export default Task;
