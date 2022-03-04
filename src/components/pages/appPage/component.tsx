import React, { useEffect, useState } from 'react';
import { UserType } from '../../../types/globalTypes';
import { FirebaseContext } from '../../../utils/fireBase';
import AuthUserContext from '../../../utils/sessionHandler';
import sortCards from '../../../utils/sortCards';
import DeskWithInfo from '../../blocks/deskWithInfo';
import NewDesk from '../../blocks/newDesk';
import './styles.css';
import { PageWithUserProps, AppPageProps } from '../../../types/appPage';

const PageWithUser = (props: PageWithUserProps) => {
  const { firebase, path } = props;

  const [userState, setUserState] = useState<UserType>({
    mail: '',
    name: '',
    uid: path,
    desks: [],
  });

  useEffect(() => {
    firebase.user(path).on('value', (snapshot) => {
      setUserState(snapshot.val());
    });
  }, []);

  return (
    <div className="appPage">
      {userState.desks
        ? Object.values(userState.desks).sort(sortCards).map((desk) => (
          <DeskWithInfo
            deskInfo={desk!}
            deskName={desk!.deskName}
            userState={userState}
            setUserState={setUserState}
          />
        ))
        : null}
      <NewDesk userState={userState} setUserState={setUserState} />
    </div>
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
  return (
    <AuthUserContext.Consumer>
      {(value) => (value ? (
        <FirebaseContext.Consumer>
          {(firebase) => <PageWithUser firebase={firebase} path={path} />}
        </FirebaseContext.Consumer>
      ) : (
        <PageNoUser />
      ))}
    </AuthUserContext.Consumer>
  );
};
export default AppPage;
