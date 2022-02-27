import React, { useState } from 'react';
import { ColumnType } from '../../../types/globalTypes';
import {
  onDragEnd,
  onDragLeave,
  onDragOver,
  onDragStart,
  onDropColumn,
} from '../../../utils/dragEvents';
import Firebase, { FirebaseContext } from '../../../utils/fireBase';
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

  const [isChanging, setChanging] = useState<boolean>(false);
  const [currentColumn, setCurrentColumn] = useState<ColumnType | null>(null);

  const deleteDesk = (
    firebase: Firebase,
    setCloseDesk: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    const newDesk = userState;
    newDesk.desks[deskName] = null;

    setUserState(newDesk);

    firebase
      .user(userState.uid.slice(1))
      .set(userState)
      .then(() => {
        setCloseDesk(false);
      });
  };

  return (
    <div className="openedDeskBlock">
      <FirebaseContext.Consumer>
        {(firebase) => (
          <>
            <div className="openedDeskBlockHead">
              <h3>
                {!isChanging && deskName}
                {isChanging && (
                  <ChangeNameField
                    userState={userState}
                    setUserState={setUserState}
                    deskName={deskName}
                    setChanging={setChanging}
                    firebase={firebase}
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
                onClick={() => deleteDesk(firebase, setOpenDesk)}
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
                  .map((column: ColumnType) => (
                    <Column
                      column={column}
                      deskName={deskName}
                      userState={userState}
                      setUserState={setUserState}
                      currentCard={currentColumn}
                      setCurrentCard={setCurrentColumn}
                      firebase={firebase}
                    />
                  ))
                : null}
              <NewColumn
                deskName={deskName}
                userState={userState}
                setUserState={setUserState}
              />
            </div>
          </>
        )}
      </FirebaseContext.Consumer>
    </div>
  );
};

export default OpenedDesk;
