import React, { useState } from 'react';
import './styles.css';
import RequestTask from '../requestTask';
import { RequestListProps } from '../../../types/requestPage';

const RequestList = (props: RequestListProps) => {
  const { requester } = props;

  const [isVisible, setIsVisible] = useState(true);

  const handleChanging = () => {
    setIsVisible((prevState) => !prevState);
  };

  return (
    <>
      <div className="requester">
        <p className="requesterMail">{requester.sender.mail}</p>
        <i className="fa fa-eye" aria-hidden="true" onClick={handleChanging} />
      </div>
      <div className={`receivedTasks ${isVisible}`}>
        {Object.values(requester.tasks).map((task) => (
          <RequestTask task={task} received key={task.id} />
        ))}
      </div>
    </>
  );
};

export default RequestList;