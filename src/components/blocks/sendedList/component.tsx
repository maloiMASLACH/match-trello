import React, { useContext, useEffect, useState } from 'react';
import './styles.css';
import RequestTask from '../requestTask';
import { TaskType } from '../../../types/globalTypes';
import { FirebaseContext } from '../../../utils/fireBase';
import SenderContext from '../../../utils/valueContexts/senderContext';
import { SenderListProps } from '../../../types/requestPage';

const SendedList = (props: SenderListProps) => {
  const { requester, uid } = props;

  const firebase = useContext(FirebaseContext);
  const receiver = useContext(SenderContext);

  const [isVisible, setIsVisible] = useState(true);
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const handleChanging = () => {
    setIsVisible((prevState) => !prevState);
  };

  useEffect(() => {
    firebase
      .senderTaskList(receiver.key.slice(1), uid)
      .on('value', (snapshot) => {
        setTasks(snapshot.val());
      });
  }, []);

  return (
    <>
      <div className="requester">
        <p className="requesterMail">{requester.sender.mail}</p>
        <p className="requesterMail">{Object.values(requester.tasks).length}</p>
        <i className="fa fa-eye" aria-hidden="true" onClick={handleChanging} />
      </div>
      <div className={`receivedTasks ${isVisible}`}>
        {Object.values(tasks || []).map((task) => (
          <RequestTask task={task} received={false} key={task.id} uid={uid} />
        ))}
      </div>
    </>
  );
};

export default SendedList;
