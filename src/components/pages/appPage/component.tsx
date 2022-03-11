import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppPageProps } from '../../../types/appPage';
import { UserType } from '../../../types/globalTypes';
import { FirebaseContext } from '../../../utils/fireBase';
import sortCards from '../../../utils/sortCards';
import DeskValueContext from '../../../utils/valueContexts/deskValueContext';
import UserValueContext from '../../../utils/valueContexts/userValueContext';
import DeskWithInfo from '../../blocks/deskWithInfo';
import NewDesk from '../../blocks/newDesk';
import './styles.css';

const PageWithUser = (props: AppPageProps) => {
  const { userID } = props;

  const firebase = useContext(FirebaseContext);

  const [userValue, setUserValue] = useState<UserType>({
    mail: '',
    name: '',
    uid: '',
    desks: {},
  });

  const sortedDesks = Object.values(userValue.desks).sort(sortCards) || [];

  useEffect(() => {
    firebase.user(userID).on('value', (snapshot) => {
      setUserValue(snapshot.val());
    });
  }, []);

  return (
    <UserValueContext.Provider value={userValue}>
      <div className="appPage">
        {sortedDesks
          .map((desk) => (
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
    <img src="./errorRobot.png" alt="error" />
  </div>
);

const AppPage: React.FC = () => {
  const { uid } = useParams();

  return uid ? <PageWithUser userID={uid} /> : <PageNoUser />;
};
export default AppPage;
