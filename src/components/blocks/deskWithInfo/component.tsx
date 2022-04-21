import React, { useContext, useState } from 'react';
import { FirebaseContext } from '../../../utils/fireBase';
import DeskValueContext from '../../../utils/valueContexts/deskValueContext';
import UserValueContext from '../../../utils/valueContexts/userValueContext';
import DeleteImg from '../../controls/images/delete';
import RedactImg from '../../controls/images/redact';
import OpenedDesk from '../openedDesk';
import ChangeNameField from './components/changeNameField';
import './styles.css';

const DeskWithInfo = () => {
  const firebase = useContext(FirebaseContext);
  const userValue = useContext(UserValueContext);
  const deskInfo = useContext(DeskValueContext);

  const [isChanging, setChanging] = useState<boolean>(false);

  const [isOpen, setOpenDesk] = useState<boolean>(true);

  const handleActive = () => {
    setOpenDesk((prevState) => !prevState);
  };

  const handleChanging = () => {
    setChanging((prevState) => !prevState);
  };

  const deleteDesk = () => {
    firebase.desk(userValue.uid, deskInfo.id).set(null);
  };

  let taskCount = 0;
  const columnCount = Object.keys(deskInfo.columns || []).length;

  if (deskInfo.columns) {
    taskCount = Object.values(deskInfo.columns).reduce(
      (acc, curr) => acc + Object.keys(curr.tasks || []).length,
      0,
    );
  }

  return (
    <div className="infoBlock">
      <div className="deskHead">
        {!isChanging ? (
          <div className="deskInfo">
            <h3>{deskInfo.deskName}</h3>
            <i className="fa fa-eye table" aria-hidden="true" onClick={handleActive} />
          </div>
        ) : (
          <ChangeNameField handleChanging={handleChanging} />
        )}
        <div className="toolImg">
          <RedactImg className="deskDelete" onClick={handleChanging} />
          <DeleteImg className="deskDelete" onClick={deleteDesk} />
        </div>
      </div>
      {isOpen ? <OpenedDesk /> : (
        <>
          <p>{`${columnCount} columns`}</p>
          <p>{`${taskCount} tasks`}</p>
        </>
      )}
    </div>
  );
};

export default DeskWithInfo;
