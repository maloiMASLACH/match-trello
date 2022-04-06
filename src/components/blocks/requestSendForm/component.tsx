import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserType } from '../../../types/globalTypes';
import { RequestSendFormProps } from '../../../types/requestPage';
import { FirebaseContext } from '../../../utils/fireBase';
import patterns, {
  validateBlockName,
  validateDescription,
} from '../../../utils/patterns';
import InputBlock from '../../controls/input';
import Select from '../../controls/select';
import TextArea from '../../controls/textarea';
import './styles.css';

const RequestSendForm = (props: RequestSendFormProps) => {
  const { userMail, userKey } = props;

  const { uid } = useParams();

  const firebase = useContext(FirebaseContext);

  const [inputName, setInputName] = useState('');
  const [inputDate, setInputDate] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserType>();

  const [users, setUsers] = useState<UserType[]>();

  const usersMails: string[] = [];

  users?.forEach((user) => {
    usersMails.push(user.mail);
  });

  useEffect(() => {
    firebase.users().on('value', (snapshot) => {
      setUsers(Object.values(snapshot.val()));
    });
  }, []);

  const sendTask = () => {
    const taskObjName = inputName.split(' ').join('');
    firebase
      .requesterName(selectedUser?.uid || '', uid || 'sender')
      .update({
        mail: userMail,
        key: userKey,
      })
      .then(() => {
        firebase.senderName(uid || '', selectedUser?.uid || '').update({
          mail: selectedUser?.mail,
          key: selectedUser?.uid,
        });
      })
      .then(() => {
        firebase
          .sendedTask(uid || '', selectedUser?.uid || '', taskObjName)
          .set(taskObjName);
      })
      .then(() => {
        firebase
          .sendRequest(selectedUser?.uid || '', uid || 'sender', taskObjName)
          .update({
            taskName: inputName,
            date: inputDate,
            completed: false,
            description: inputDescription,
            id: 1,
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
            setSelectedUser(users[usersMails.indexOf(e.target.value)]);
          }
        }}
      />
      {selectedUser?.uid.slice(1) === uid && <p>Choose another user</p>}
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
          || selectedUser?.uid.slice(1) === uid
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
