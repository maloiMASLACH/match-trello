import React, { useContext, useEffect, useState } from 'react';
import { AppPageProps } from '../../../types/appPage';
import { UserType } from '../../../types/globalTypes';
import { FirebaseContext } from '../../../utils/fireBase';
import AuthUserContext from '../../../utils/sessionHandler';
import sortCards from '../../../utils/sortCards';
import DeskValueContext from '../../../utils/valueContexts/deskValueContext';
import UserValueContext from '../../../utils/valueContexts/userValueContext';
import DeskWithInfo from '../../blocks/deskWithInfo';
import NewDesk from '../../blocks/newDesk';
import './styles.css';

const PageWithUser = (props:AppPageProps) => {
  const { path } = props;
  const firebase = useContext(FirebaseContext);

  const [userValue, setUserValue] = useState<UserType>({
    mail: '',
    name: '',
    uid: '',
    desks: [],
  });

  useEffect(() => {
    firebase!.user(path).on('value', (snapshot) => {
      setUserValue(snapshot.val());
    });
  }, []);

  return (
    <UserValueContext.Provider value={userValue}>
      <div className="appPage">
        {userValue!.desks
          ? Object.values(userValue!.desks).sort(sortCards).map((desk) => (
            <DeskValueContext.Provider value={desk}>
              <DeskWithInfo />
            </DeskValueContext.Provider>
          ))
          : null}
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

const AppPage: React.FC<AppPageProps> = (props) => {
  const { path } = props;
  const user = useContext(AuthUserContext);

  if (user) {
    return <PageWithUser path={path} />;
  } return <PageNoUser />;
};
export default AppPage;
