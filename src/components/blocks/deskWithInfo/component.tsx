import React, { useContext, useState } from 'react';
import { DeskWithInfoProps } from '../../../types';
import { FirebaseContext, UserValueContext, DeskValueContext } from '../../../utils';
import { RedactImg, DeleteImg, BackImg } from '../../controls/images';
import OpenedDesk from '../openedDesk';
import ChangeNameField from './components/changeNameField';
import './styles.css';

const DeskWithInfo = (props: DeskWithInfoProps) => {
  const { isActive, handleActive } = props;

  const firebase = useContext(FirebaseContext);
  const { uid } = useContext(UserValueContext);
  const { deskName, columns, id } = useContext(DeskValueContext);

  const [isChanging, setChanging] = useState<boolean>(false);

  const [isOpen, setOpenDesk] = useState<boolean>(false);

  const handleOpened = () => {
    setOpenDesk((prevState) => !prevState);
    handleActive();
  };

  const handleChanging = () => {
    setChanging((prevState) => !prevState);
  };

  const deleteDesk = () => {
    firebase.desk(uid, id).set(null);
  };

  let taskCount = 0;
  const columnCount = Object.keys(columns || []).length;

  if (columns) {
    taskCount = Object.values(columns).reduce(
      (acc, curr) => acc + Object.keys(curr.tasks || []).length,
      0,
    );
  }

  return !isOpen ? (
    <div className={`infoBlock ${isActive && 'active'} ${isOpen && 'open'}`}>
      <div className="deskHead">
        {!isChanging ? (
          <div className="deskInfo">
            <h3>{deskName}</h3>
            <i
              className="fa fa-eye table"
              aria-hidden="true"
              onClick={handleOpened}
            />
          </div>
        ) : (
          <ChangeNameField handleChanging={handleChanging} />
        )}
        <div className="toolImg">
          <RedactImg className="deskDelete" onClick={handleChanging} />
          <DeleteImg className="deskDelete" onClick={deleteDesk} />
        </div>
      </div>
      <p>{`${columnCount} columns`}</p>
      <p>{`${taskCount} tasks`}</p>
    </div>
  ) : (
    <>
      <div className="openedHead">
        <BackImg
          className="back"
          onClick={handleOpened}
        />
        <h4>{`Desk: ${deskName}`}</h4>
      </div>
      <OpenedDesk />
    </>
  );
};

export default DeskWithInfo;
