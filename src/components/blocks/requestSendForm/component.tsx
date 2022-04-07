import React, { useContext, useEffect, useState } from 'react';
import { UserType } from '../../../types/globalTypes';
import { RequestSendFormProps } from '../../../types/requestPage';
import { FirebaseContext } from '../../../utils/fireBase';
import patterns, {
  validateBlockName,
  validateDescription,
} from '../../../utils/patterns';
import sortCards from '../../../utils/sortCards';
import InputBlock from '../../controls/input';
import Select from '../../controls/select';
import TextArea from '../../controls/textarea';
import './styles.css';

const RequestSendForm = (props: RequestSendFormProps) => {
  const { userMail, userKey, uid } = props;

  const firebase = useContext(FirebaseContext);

  const [inputName, setInputName] = useState('');
  const [inputDate, setInputDate] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [userId, setUserId] = useState(0);

  const [users, setUsers] = useState<UserType[]>([]);

  const usersMails: string[] = [];

  users?.forEach((user) => {
    usersMails.push(user.mail);
  });

  useEffect(() => {
    firebase.users().on('value', (snapshot) => {
      setUsers(Object.values(snapshot.val()));
    });
  }, []);

  let lastId = 0;

  const setLastId = () => {
    if (
      users[userId]
      && users[userId].requests
      && users[userId].requests.received[uid!]
      && users[userId].requests.received[uid!].tasks
    ) {
      const sortedTasks = Object.values(
        users[userId].requests.received[uid!].tasks,
      ).sort(sortCards);
      lastId = sortedTasks[sortedTasks.length - 1].id + 1;
    }
  };

  const sendTask = () => {
    setLastId();

    const taskObjName = inputName.split(' ').join('') + lastId;

    firebase
      .requesterName(users[userId]?.uid, uid)
      .update({
        mail: userMail,
        key: userKey,
      })
      .then(() => {
        firebase.senderName(uid, users[userId]?.uid).update({
          mail: users[userId]?.mail,
          key: users[userId]?.uid,
        });
      })
      .then(() => {
        firebase
          .sendedTask(uid, users[userId]?.uid, taskObjName)
          .set(taskObjName);
      })
      .then(() => {
        firebase
          .sendRequest(users[userId]?.uid, uid, taskObjName)
          .update({
            taskName: inputName,
            date: inputDate,
            completed: false,
            description: inputDescription,
            id: lastId,
          });
      });
  };

  return (
    <>
      <Select
        id="requestList"
        values={usersMails}
        selected={usersMails[0]}
        onChange={(e) => {
          if (users) {
            setUserId(usersMails.indexOf(e.target.value));
          }
        }}
      />
      {users[userId]?.uid.slice(1) === uid && <p>Choose another user</p>}
      <div className="inputBlock">
        <InputBlock
          id={inputName}
          value={inputName}
          label=""
          placeholder="Task name"
          type="text"
          validation={validateBlockName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputName(e.target.value)}
        />
      </div>
      <div className="inputBlock">
        <InputBlock
          id={inputDate}
          value={inputDate}
          label=""
          placeholder="Task date"
          type="text"
          validation={validateBlockName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputDate(e.target.value)}
        />
      </div>
      <div className="inputBlock">
        <TextArea
          id={inputDescription}
          value={inputDescription}
          placeholder="Task description"
          validation={validateDescription}
          onChange={
            (e: React.ChangeEvent<HTMLTextAreaElement>) => setInputDescription(e.target.value)
          }
        />
      </div>
      <button
        type="submit"
        disabled={
          !patterns.blockName.test(inputName)
          || !patterns.blockName.test(inputDate)
          || users[userId]?.uid.slice(1) === uid
          || inputDescription.length > 120
        }
        onClick={sendTask}
      >
        confirm
      </button>
    </>
  );
};

export default RequestSendForm;
