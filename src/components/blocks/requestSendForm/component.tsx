import React, { useContext, useEffect, useState } from 'react';
import Placeholders from '../../../constants/placeholders';
import { UserType } from '../../../types/globalTypes';
import { RequestSendFormProps } from '../../../types/requestPage';
import { FirebaseContext } from '../../../utils/fireBase';
import patterns, {
  validateBlockName,
  validateDescription,
} from '../../../utils/patterns';
import { sortCards } from '../../../utils/sortCards';
import InputBlock from '../../controls/input';
import Select from '../../controls/select';
import TextArea from '../../controls/textarea';
import './styles.css';

const RequestSendForm = (props: RequestSendFormProps) => {
  const { userMail, userKey, currentId } = props;

  const firebase = useContext(FirebaseContext);

  const [inputName, setInputName] = useState('');
  const [inputDate, setInputDate] = useState('');
  const [inputDescription, setInputDescription] = useState('');

  const [userId, setUserId] = useState(0);

  const [users, setUsers] = useState<UserType[]>([]);
  const [usersMail, setUsersMail] = useState<string[]>([]);

  useEffect(() => {
    firebase.users().on('value', (snapshot) => {
      const usersObj: { [key: string]: UserType } = snapshot.val();
      const usersArr = Object.values(usersObj);

      usersArr.splice(usersArr.indexOf(usersObj[currentId]), 1);

      setUsers(usersArr);
      setUsersMail(usersArr.map((user) => user.mail));
    });
  }, []);

  let lastId = 0;

  const setLastId = () => {
    const { requests } = users[userId] || {};

    if (requests?.received) {
      const { tasks } = requests.received[currentId] || {};

      if (tasks) {
        const sortedTasks = Object.values(tasks).sort(sortCards);

        lastId = sortedTasks[sortedTasks.length - 1].id + 1;
      }
    }
  };

  const sendTask = () => {
    setLastId();

    const taskObjId = lastId;
    const { uid } = users[userId];
    const { mail } = users[userId];

    firebase
      .requesterName(uid, currentId)
      .update({
        mail: userMail,
        key: userKey,
      })
      .then(() => {
        firebase.senderName(currentId, uid).update({
          mail,
          key: uid,
        });
      })
      .then(() => {
        firebase.sendedTask(currentId, uid, taskObjId).set(taskObjId);
      })
      .then(() => {
        firebase.sendRequest(uid, currentId, taskObjId).update({
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
        values={usersMail}
        onChange={(e) => {
          if (users) {
            setUserId(usersMail.indexOf(e.target.value));
          }
        }}
      />
      <div className="inputBlock">
        <InputBlock
          id="taskName"
          value={inputName}
          placeholder={Placeholders.TaskName}
          type="text"
          validation={validateBlockName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputName(e.target.value)}
        />
      </div>
      <div className="inputBlock">
        <InputBlock
          id="taskDate"
          value={inputDate}
          placeholder={Placeholders.TaskDate}
          type="text"
          validation={validateBlockName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputDate(e.target.value)}
        />
      </div>
      <div className="inputBlock">
        <TextArea
          id="description"
          value={inputDescription}
          placeholder={Placeholders.Description}
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
          || users[userId]?.uid.slice(1) === currentId
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
