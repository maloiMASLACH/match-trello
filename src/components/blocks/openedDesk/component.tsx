import React, { useContext, useState } from 'react';
import { ColumnType } from '../../../types/globalTypes';
import { FirebaseContext } from '../../../utils/fireBase';
import sortCards from '../../../utils/sortCards';
import NewColumn from '../newColumn';
import './styles.css';
import { OpenedDeskProps } from '../../../types/openedDesk';
import ChangeNameField from './components/changeNameField';
import Column from './components/column';

const OpenedDesk = (props: OpenedDeskProps) => {
  const {
    deskInfo, deskName, setOpenDesk, userState, setUserState,
  } = props;

  const firebase = useContext(FirebaseContext);

  const [isChanging, setChanging] = useState<boolean>(false);
  const [currentColumn, setCurrentColumn] = useState<ColumnType | null>(null);
  const deskNameObj = deskName.split(' ').join('_');

  const deleteDesk = () => {
    const newDesk = userState;

    newDesk.desks[deskNameObj as any] = null;

    setUserState(newDesk);

    firebase
      .user(userState.uid.slice(1))
      .set(userState)
      .then(() => {
        setOpenDesk(false);
      });
  };

  return (
    <div className="openedDeskBlock">
      <div className="openedDeskBlockHead">
        <h3>
          {!isChanging && deskName}
          {isChanging && (
          <ChangeNameField
            userState={userState}
            setUserState={setUserState}
            deskName={deskName}
            setChanging={setChanging}
          />
          )}
        </h3>
        <img
          className="deskDelete"
          src="./redact.png"
          alt="redact"
          onClick={() => {
            setChanging(!isChanging);
          }}
          aria-hidden="true"
        />
        <img
          className="deskDelete"
          alt="delete"
          src="./delete.png"
          onClick={() => deleteDesk()}
          aria-hidden="true"
        />
        <img
          src="./x.png"
          alt="x"
          onClick={() => {
            setOpenDesk(false);
          }}
          aria-hidden="true"
        />
      </div>
      <div className="colons">
        {deskInfo.columns
          ? Object.values(deskInfo.columns)
            .sort(sortCards)
            .map((column: ColumnType | null) => (
              <Column
                column={column!}
                deskName={deskName}
                userState={userState}
                setUserState={setUserState}
                currentCard={currentColumn}
                setCurrentCard={setCurrentColumn}
              />
            ))
          : null}
        <NewColumn
          deskName={deskName}
          userState={userState}
          setUserState={setUserState}
        />
      </div>
    </div>
  );
};

export default OpenedDesk;
