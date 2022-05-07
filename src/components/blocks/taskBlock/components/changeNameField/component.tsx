import React, { useContext, useEffect, useState } from 'react';
import { Placeholders } from '../../../../../constants';
import { ChangeTaskProps, UserType } from '../../../../../types';
import {
  FirebaseContext,
  TaskValueContext,
  AuthUserContext,
  GetUserMails,
  validateBlockName,
  validateDescription,
  patterns,
} from '../../../../../utils';
import { InputBlock, TextArea, Select } from '../../../../controls';
import './styles.css';

const ChangeTaskField = (props: ChangeTaskProps) => {
  const { handleChanging } = props;

  const firebase = useContext(FirebaseContext);
  const taskValue = useContext(TaskValueContext);
  const { userMail } = useContext(AuthUserContext);

  const [users, setUsers] = useState<UserType[]>([]);
  const [usersMails, setUsersMails] = useState<string[]>([
    '',
    taskValue.forUser,
  ]);

  const [userId, setUserId] = useState(0);

  const [inputName, setInputName] = useState(taskValue.taskName || '');
  const [inputDate, setInputDate] = useState(taskValue.date || '');
  const [inputDescription, setInputDescription] = useState(
    taskValue.description || '',
  );

  const isDisabled = !patterns.blockName.test(inputName)
    || !patterns.blockName.test(inputDate)
    || inputDescription.length > 120;

  const renameTask = () => {
    const modifiedTask = {
      ...taskValue,
      taskName: inputName,
      date: inputDate,
      description: inputDescription,
      forUser: userId !== -1 ? users[userId].mail : '',
      forUserId: userId !== -1 ? users[userId].uid : '',
      assignedBy: userId !== -1 ? userMail : '',
    };

    firebase
      .task({
        uid: taskValue.assignedById,
        deskObjId: Number(taskValue.deskObjId),
        columnObjId: Number(taskValue.columnObjId),
        taskObjId: taskValue.id,
      })
      .set(modifiedTask);

    handleChanging();
  };

  useEffect(() => {
    firebase.users().on('value', (snapshot) => {
      const params = {
        users: snapshot.val(),
        uid: taskValue.assignedById,
        selectedMail: taskValue.forUser,
        setUsers,
        setUsersMails,
        setUserId,
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
          defaultValue={usersMails[usersMails.indexOf(taskValue.forUser)]}
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
        disabled={isDisabled}
      >
        OK
      </button>
    </div>
  );
};

export default ChangeTaskField;
