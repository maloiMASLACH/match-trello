import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppPageProps } from '../../../types/appPage';
import { UserType } from '../../../types/globalTypes';
import { FirebaseContext } from '../../../utils/fireBase';
import AuthUserContext from '../../../utils/sessionHandler';
import { sortCards } from '../../../utils/sortCards';
import DeskValueContext from '../../../utils/valueContexts/deskValueContext';
import UserValueContext from '../../../utils/valueContexts/userValueContext';
import DeskWithInfo from '../../blocks/deskWithInfo';
import NewDesk from '../../blocks/newDesk';
import './styles.css';

const PageWithUser = (props: AppPageProps) => {
  const { userID, isVisitor } = props;

  const firebase = useContext(FirebaseContext);

  const [userValue, setUserValue] = useState<UserType>({
    mail: '',
    name: '',
    uid: '',
    desks: {},
    requests: { sended: {}, received: {} },
    assignments: {},
  });

  const sortedDesks = Object.values(userValue.desks || []).sort(sortCards);

  useEffect(() => {
    firebase.user(userID).on('value', (snapshot) => {
      setUserValue(snapshot.val());
    });
  }, []);

  return (
    <UserValueContext.Provider value={userValue}>
      {isVisitor && <h3 className="appTitle">{`${userValue.name}'s desks`}</h3>}
      <div className="appPage">
        {sortedDesks.map((desk) => (
          <DeskValueContext.Provider key={desk.id} value={desk}>
            <DeskWithInfo />
          </DeskValueContext.Provider>
        ))}
        <NewDesk />
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

  return uid && (uid === userId || isAdmin) ? (
    <PageWithUser userID={uid} isVisitor={uid !== userId} />
  ) : (
    <PageNoUser />
  );
};

export default AppPage;
