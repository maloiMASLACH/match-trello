import React, { useContext, useState } from 'react';
import { AddFormProps } from '../../../../../types/newColumn';
import './styles.css';
import { FirebaseContext } from '../../../../../utils/fireBase';

const AddForm = (props: AddFormProps) => {
  const {
    handleActive, userState, setUserState, deskName,
  } = props;

  const firebase = useContext(FirebaseContext);

  const [inputValue, setInputValue] = useState('');

  const addColumn = (name: string) => {
    const newDesk = userState;
    const columnName = name.split(' ').join('_');
    const deskNameObj = deskName.split(' ').join('_');
    const newColumn = {
      tasks: [],
      id: userState.desks[deskNameObj as any]!.columns
        ? Object.keys(userState.desks[deskNameObj as any]!.columns).length + 1
        : 1,
      columnName: name,
    };
    if (!newDesk.desks[deskNameObj as any]!.columns) {
      newDesk.desks[deskNameObj as any]!.columns = [];
    }
    newDesk.desks[deskNameObj as any]!.columns[columnName as any]! = newColumn;

    setUserState(newDesk);

    firebase
      .user(userState.uid.slice(1))
      .set(userState)
      .then(() => {
        handleActive();
      });
  };

  return (
    <div className="addColonBlock">
      <img
        src="./x.png"
        alt="add"
        className="addColonImgClose"
        onClick={() => handleActive()}
        aria-hidden="true"
      />
      <input
        type="text"
        value={inputValue}
        placeholder="Colon name"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        type="submit"
        onClick={() => {
          addColumn(inputValue);
        }}
      >
        confirm
      </button>
    </div>
  );
};

export default AddForm;
