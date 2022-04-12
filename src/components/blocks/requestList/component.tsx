import React, { useState } from 'react';
import './styles.css';
import { RequestListProps } from '../../../types/requestPage';
import TaskList from '../taskList';

const RequestList = (props: RequestListProps) => {
  const { requester, currentId } = props;

  const [isVisible, setIsVisible] = useState(true);

  const handleChanging = () => {
    setIsVisible((prevState) => !prevState);
  };

  return (
    <>
      <div className="requester">
        <p className="requesterMail">{requester.sender.mail}</p>
        <p className="requesterMail">{Object.values(requester.tasks).length}</p>
        <i className="fa fa-eye" aria-hidden="true" onClick={handleChanging} />
      </div>
      <div className={`receivedTasks ${isVisible}`}>
        <TaskList tasks={requester.tasks} currentId={currentId} received />
      </div>
    </>
  );
};

export default RequestList;
