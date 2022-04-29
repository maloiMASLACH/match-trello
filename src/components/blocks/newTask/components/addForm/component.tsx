import React, { useContext, useEffect, useState } from 'react';
import './styles.css';
import { FirebaseContext } from '../../../../../utils/fireBase';
import { sortCards } from '../../../../../utils/sortCards';
import ColumnValueContext from '../../../../../utils/valueContexts/columnValueContext';
import { NewTaskAddProps } from '../../../../../types/newTask';
import patterns, {
  validateBlockName,
  validateDescription,
} from '../../../../../utils/patterns';
import TextArea from '../../../../controls/textarea';
import InputBlock from '../../../../controls/input';
import Placeholders from '../../../../../constants/placeholders';
import CloseImg from '../../../../controls/images/close';
import { UserType } from '../../../../../types/globalTypes';
import Select from '../../../../controls/select';
import GetUserMails from '../../../../../utils/getUserMails';
import AuthUserContext from '../../../../../utils/sessionHandler';

const AddForm = (props: NewTaskAddProps) => {
  const { uid, deskObjId, handleActive } = props;

  const firebase = useContext(FirebaseContext);
  const columnValue = useContext(ColumnValueContext);
  const { userMail } = useContext(AuthUserContext);

  const [inputName, setInputName] = useState('');
  const [inputDate, setInputDate] = useState('');
  const [inputDescription, setInputDescription] = useState('');

  const [userId, setUserId] = useState(0);

  const [users, setUsers] = useState<UserType[]>([]);
  const [usersMails, setUsersMails] = useState<string[]>(['']);

  const addTask = () => {
    let lastId = 0;

    if (columnValue.tasks) {
      const sortedTasks = Object.values(columnValue.tasks).sort(sortCards);

      lastId = sortedTasks[sortedTasks.length - 1].id + 1;
    }

    firebase.task(uid, deskObjId, columnValue.id, lastId).update({
      taskName: inputName,
      date: inputDate,
      completed: false,
      description: inputDescription,
      forUser: userId !== -1 ? users[userId].mail : '',
      forUserId: userId !== -1 ? users[userId].uid : '',
      assignedBy: userId !== -1 ? userMail : '',
      assignedById: uid,
      deskObjId,
      columnObjId: columnValue.id,
      id: lastId,
      position: lastId,
    });

    handleActive();
  };

  useEffect(() => {
    firebase.users().on('value', (snapshot) => {
      const params = {
        users: snapshot.val(),
        uid,
        selectedMail: '',
        setUsers,
        setUsersMails,
        setUserId,
      };
      GetUserMails(params);
    });
  }, []);

  return (
    <div className="addTaskBlock">
      <div className="inputBlock">
        <InputBlock
          id="addTaskName"
          value={inputName}
          placeholder={Placeholders.TaskName}
          type="text"
          validation={validateBlockName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputName(e.target.value)}
        />
      </div>
      <div className="inputBlock">
        <InputBlock
          id="addTaskDate"
          value={inputDate}
          placeholder={Placeholders.TaskDate}
          type="text"
          validation={validateBlockName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputDate(e.target.value)}
        />
      </div>
      <div className="inputBlock">
        <TextArea
          id="Description"
          value={inputDescription}
          onChange={
            (e: React.ChangeEvent<HTMLTextAreaElement>) => setInputDescription(e.target.value)
          }
          placeholder={Placeholders.Description}
          validation={validateDescription}
        />
      </div>
      <div className="inputBlock">
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
        type="submit"
        disabled={
          !patterns.blockName.test(inputName)
          || !patterns.blockName.test(inputDate)
          || inputDescription.length > 120
        }
        onClick={addTask}
      >
        confirm
      </button>
      <CloseImg className="addTaskImgClose" onClick={handleActive} />
    </div>
  );
};

export default AddForm;
