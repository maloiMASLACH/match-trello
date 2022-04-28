import React, { useContext, useEffect, useState } from 'react';
import patterns, {
  validateBlockName,
  validateDescription,
} from '../../../../../utils/patterns';
import { ChangeTaskProps } from '../../../../../types/changeInput';
import { FirebaseContext } from '../../../../../utils/fireBase';
import TaskValueContext from '../../../../../utils/valueContexts/taskValueContext';
import './styles.css';
import TextArea from '../../../../controls/textarea';
import InputBlock from '../../../../controls/input';
import Placeholders from '../../../../../constants/placeholders';
import Select from '../../../../controls/select';
import { UserType } from '../../../../../types/globalTypes';
import GetUserMails from '../../../../../utils/getUserMails';
import AuthUserContext from '../../../../../utils/sessionHandler';

const ChangeTaskField = (props: ChangeTaskProps) => {
  const {
    handleChanging,
  } = props;

  const firebase = useContext(FirebaseContext);
  const taskValue = useContext(TaskValueContext);
  const { userMail } = useContext(AuthUserContext);

  const [users, setUsers] = useState<UserType[]>([]);
  const [usersMails, setUsersMails] = useState<string[]>(['']);

  const [userId, setUserId] = useState(-1);

  const [inputName, setInputName] = useState(taskValue.taskName || '');
  const [inputDate, setInputDate] = useState(taskValue.date || '');
  const [inputDescription, setInputDescription] = useState(
    taskValue.description || '',
  );

  const renameTask = () => {
    const modifiedTask = {
      ...taskValue,
      taskName: inputName,
      date: inputDate,
      description: inputDescription,
      forUser: users[userId] ? users[userId].mail : '',
      forUserId: users[userId] ? users[userId].uid : '',
      assignedBy: userMail,
    };

    firebase.task(
      taskValue.assignedById,
      Number(taskValue.deskObjId),
      Number(taskValue.columnObjId),
      taskValue.id,
    ).set(modifiedTask);

    handleChanging();
  };

  useEffect(() => {
    firebase.users().on('value', (snapshot) => {
      const params = {
        users: snapshot.val(),
        uid: taskValue.assignedById,
        setUsers,
        setUsersMails,
      };
      GetUserMails(params);
    });
  }, []);

  return (
    <div className="changeTaskBlock">
      <div className="changeTaskInputBlock">
        <InputBlock
          id="changeTaskName"
          value={inputName}
          placeholder={Placeholders.TaskName}
          type="text"
          className="newTaskName"
          validation={validateBlockName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputName(e.target.value)}
        />
      </div>
      <div className="changeTaskInputBlock">
        <InputBlock
          id="changeTaskDate"
          value={inputDate}
          placeholder={Placeholders.TaskDate}
          type="text"
          className="newTaskName"
          validation={validateBlockName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputDate(e.target.value)}
        />
      </div>
      <div className="changeTaskInputBlock">
        <TextArea
          id="Description"
          className="newTaskName"
          value={inputDescription}
          onChange={
            (e: React.ChangeEvent<HTMLTextAreaElement>) => setInputDescription(e.target.value)
          }
          placeholder={Placeholders.Description}
          validation={validateDescription}
        />
      </div>
      <div className="changeTaskInputBlock">
        <Select
          id="requestList"
          values={usersMails}
          onChange={(e) => {
            if (users) {
              setUserId(usersMails.indexOf(e.target.value) - 1);
            }
          }}
        />
      </div>
      <button
        className="taskRedactSubmit"
        type="submit"
        onClick={renameTask}
        disabled={
          !patterns.blockName.test(inputName)
          || !patterns.blockName.test(inputDate)
          || inputDescription.length > 120
        }
      >
        OK
      </button>
    </div>
  );
};

export default ChangeTaskField;
