import React, { useState } from 'react';
import { User } from '../../constants/interfaces';
import Firebase, { FirebaseContext } from '../../utils/fireBase';
import './newTask.css';

interface NewTaskProps{
  userState: User
  deckName:string
  colon:string
  setUserState: React.Dispatch<React.SetStateAction<User>>
}
interface AddTabletProps {
  setActive:React.Dispatch<React.SetStateAction<boolean>>
}
interface AddFormProps {
  setActive:React.Dispatch<React.SetStateAction<boolean>>
  userState: User
  setUserState: React.Dispatch<React.SetStateAction<User>>
  deckName:string
  colon:string
}

const AddTablet = function (props:AddTabletProps) {
  const { setActive } = props;
  return (
    <div className="addTaskBlock">
      <p>Add task</p>
      <img src="./plus.png" alt="add" className="addTaskImg" onClick={() => setActive(true)} aria-hidden="true" />
    </div>
  );
};

const AddForm = function (props:AddFormProps) {
  const {
    setActive, userState, setUserState, deckName, colon,
  } = props;
  const [inputName, setInputName] = useState('');
  const [inputDate, setInputDate] = useState('');

  const addTask = function (name:string, date:string, firebase:Firebase) {
    const newDeck = userState;
    const taskName = name.split(' ').join('');
    newDeck.decks[deckName][colon][taskName] = { taskName, date, completed: true };
    setUserState(newDeck);
    firebase.user(userState.uid.slice(1)).set(userState).then(() => {
      setActive(false);
    });
  };

  return (
    <FirebaseContext.Consumer>
      {(firebase) => (
        <div className="addTaskBlock">
          <input
            type="text"
            value={inputName}
            placeholder="Task name"
            onChange={(e) => setInputName(e.target.value)}
          />
          <input
            type="text"
            value={inputDate}
            placeholder="Task date"
            onChange={(e) => setInputDate(e.target.value)}
          />
          <button type="submit" onClick={() => { addTask(inputName, inputDate, firebase); }}>confirm</button>
          <img src="./x.png" alt="add" className="addTaskImgClose" onClick={() => setActive(false)} aria-hidden="true" />
        </div>
      )}

    </FirebaseContext.Consumer>
  );
};

const NewTask = function (props:NewTaskProps) {
  const {
    userState, setUserState, deckName, colon,
  } = props;
  const [isActive, setActive] = useState <boolean>(false);
  if (isActive) {
    return (
      <AddForm
        setActive={setActive}
        userState={userState}
        setUserState={setUserState}
        deckName={deckName}
        colon={colon}
      />
    );
  } return (<AddTablet setActive={setActive} />);
};

export default NewTask;
