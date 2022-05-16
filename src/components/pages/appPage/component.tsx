import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppPageProps, UserType } from '../../../types';
import {
  FirebaseContext, sortCards, getAssignedTasks, UserValueContext, DeskValueContext, AuthUserContext,
} from '../../../utils';
import AssignedBlock from '../../blocks/assignedBlock';
import DeskWithInfo from '../../blocks/deskWithInfo';
import NewDesk from '../../blocks/newDesk';
import './styles.css';

const PageWithUser = (props: AppPageProps) => {
  const { userID, isVisitor } = props;

  const firebase = useContext(FirebaseContext);

  const [users, setUsers] = useState<{ [key: string]: UserType }>({});
  const [userValue, setUserValue] = useState<UserType>({
    mail: '',
    name: '',
    uid: '',
    isAdmin: false,
    desks: {},
  });

  const [isActive, setActive] = useState(false);

  const sortedDesks = Object.values(userValue.desks || []).sort(sortCards);

  const assignedTasks = getAssignedTasks(users, userID);

  const handleActive = () => {
    setActive((prevState) => !prevState);
  };

  useEffect(() => {
    firebase.users().on('value', (snapshot) => {
      const usersObj = snapshot.val();
      setUsers(usersObj);
      setUserValue(usersObj[userID]);
    });
  }, [userID]);

  return (
    <UserValueContext.Provider value={userValue}>
      {isVisitor && !isActive && (
        <div className="appHead">
          <h3 className="appTitle">{`${userValue.name}'s desks`}</h3>
        </div>
      )}
      <div className={`appPage ${isActive && 'active'}`}>
        {sortedDesks.map((desk) => (
          <DeskValueContext.Provider key={desk.id} value={desk}>
            <DeskWithInfo isActive={isActive} handleActive={handleActive} />
          </DeskValueContext.Provider>
        ))}
        {!isActive && <NewDesk />}
        <AssignedBlock
          assignments={assignedTasks}
          isActive={isActive}
          handleActive={handleActive}
        />
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

  const { userId, isAdmin } = useContext(AuthUserContext);

  return userId && uid && (userId === uid || isAdmin) ? (
    <PageWithUser userID={uid} isVisitor={!!userId && uid !== userId} />
  ) : (
    <PageNoUser />
  );
};

export default AppPage;
