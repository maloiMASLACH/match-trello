import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppPageProps } from '../../../types/appPage';
import { UserType } from '../../../types/globalTypes';
import { desksChecker } from '../../../utils/assignedChecker';
import { FirebaseContext } from '../../../utils/fireBase';
import GetAssignedTasks from '../../../utils/getAssignedTask';
import AuthUserContext from '../../../utils/sessionHandler';
import { sortCards } from '../../../utils/sortCards';
import DeskValueContext from '../../../utils/valueContexts/deskValueContext';
import UserValueContext from '../../../utils/valueContexts/userValueContext';
import AssignedBlock from '../../blocks/assignedBlock';
import DeskWithInfo from '../../blocks/deskWithInfo';
import NewDesk from '../../blocks/newDesk';
import './styles.css';

const PageWithUser = (props: AppPageProps) => {
  const { userID, isVisitor } = props;

  const firebase = useContext(FirebaseContext);
  const { userMail } = useContext(AuthUserContext);

  const [users, setUsers] = useState<{ [key: string]: UserType }>({});
  const [userValue, setUserValue] = useState<UserType>({
    mail: '',
    name: '',
    uid: '',
    desks: {},
    requests: { sended: {}, received: {} },
  });

  const [isActive, setActive] = useState(false);
  const [isSwitched, setSwitched] = useState(false);

  const sortedDesks = Object.values(userValue.desks || []).sort(sortCards);

  const yourDesks = !isSwitched
    ? sortedDesks
    : desksChecker(sortedDesks, userMail);

  const assignedTasks = GetAssignedTasks(users, userID);

  const handleActive = () => {
    setActive((prevState) => !prevState);
  };

  const handleSwitch = () => {
    setSwitched((prevState) => !prevState);
  };

  useEffect(() => {
    firebase.users().on('value', (snapshot) => {
      const res = snapshot.val();
      setUsers(res);
      setUserValue(res[userID]);
    });
  }, [userID]);

  return (
    <UserValueContext.Provider value={userValue}>
      {isVisitor && (
        <div className="appHead">
          <h3 className="appTitle">{`${userValue.name}'s desks`}</h3>
          {!isActive && (
          <div className="switcher">
            <input type="checkbox" checked={isSwitched} id="toggle" onChange={handleSwitch} />
            <label htmlFor="toggle" />
            <p>Only your tasks</p>
          </div>
          ) }
        </div>
      )}
      <div className={`appPage ${isActive && 'active'}`}>
        {yourDesks.map((desk) => (
          <DeskValueContext.Provider key={desk.id} value={desk}>
            <DeskWithInfo
              isActive={isActive}
              handleActive={handleActive}
              isSwitched={isSwitched}
            />
          </DeskValueContext.Provider>
        ))}
        {!isActive && <NewDesk />}
        {!!assignedTasks.length && !isActive && (
          <AssignedBlock assignments={assignedTasks} />
        )}
      </div>
    </UserValueContext.Provider>
  );
};

const PageNoUser = () => (
  <div className="userPage notAuthUser">
    <p>Sorry, but this page require an authorized user</p>
    <img src="./../errorRobot.png" alt="error" />
  </div>
);

const AppPage: React.FC = () => {
  const { uid } = useParams();

  const { userId } = useContext(AuthUserContext);

  return uid && userId ? (
    <PageWithUser userID={uid} isVisitor={!!userId && uid !== userId} />
  ) : (
    <PageNoUser />
  );
};

export default AppPage;
