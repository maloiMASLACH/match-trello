import React, { useContext, useState } from 'react';
import { AddFormProps } from '../../../../../types/newDesk';
import './styles.css';
import { FirebaseContext } from '../../../../../utils/fireBase';
import { DeskType } from '../../../../../types/globalTypes';

const AddForm = (props: AddFormProps) => {
  const { handleActive, userState, setUserState } = props;

  const firebase = useContext(FirebaseContext);

  const [inputValue, setInputValue] = useState('');

  const addDesk = (name: string) => {
    const newState = userState;
    const deskName = name.split(' ').join('_');
    const newDesk: DeskType = {
      columns: [],
      id: userState.desks ? Object.keys(userState.desks).length + 1 : 1,
      deskName: name,
    };

    if (!newState.desks) {
      newState.desks = [];
    }

    newState.desks[deskName as any] = newDesk;

    setUserState(newState);

    firebase
      .user(userState.uid.slice(1))
      .set(userState)
      .then(() => {
        handleActive();
      });
  };

  return (
    <div className="addBlock">
      <img
        src="./x.png"
        alt="add"
        className="addDeskImgClose"
        onClick={() => handleActive()}
        aria-hidden="true"
      />
      <input
        type="text"
        value={inputValue}
        placeholder="Desk name"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        type="submit"
        onClick={() => {
          addDesk(inputValue);
        }}
      >
        confirm
      </button>
    </div>
  );
};

export default AddForm;

// {
//   First_Column: {
//     tasks: {
//       task: {
//         taskName: 'task',
//         date: 'tomorrow',
//         completed: false,
//         id: 1,
//       },
//     },
//     id: 1,
//     columnName: 'First Column',
//   },
// };
