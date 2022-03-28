import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { app, passReset } from '../../../constants/routerLinks';
import AuthUserContext from '../../../utils/sessionHandler';
import PasswordActionLink from '../../controls/passwordChangeLink';
import './styles.css';
import { FirebaseContext } from '../../../utils/fireBase';
import { UserType } from '../../../types/globalTypes';
import { PageWithUserProps } from '../../../types/userPage';
import * as themes from '../../../constants/themes';

const PageWithUser = (props: PageWithUserProps) => {
  const { isVerified, userID, setTheme } = props;

  const firebase = useContext(FirebaseContext);

  const [userValue, setUserValue] = useState<UserType>({
    desks: [],
    mail: '',
    uid: '',
    name: '',
  });

  let taskCount = 0;

  const selected = localStorage.getItem('theme');

  useEffect(() => {
    firebase.user(userID).on('value', (snapshot) => {
      setUserValue(snapshot.val());
    });
  }, []);

  if (userValue.desks) {
    Object.values(userValue.desks).forEach((desk) => {
      if (desk.columns) {
        Object.values(desk.columns).forEach((column) => {
          taskCount += Object.keys(column.tasks || []).length;
        });
      }
    });
  }

  return (
    <div className="userPage">
      <div className="userIcon">{userValue.name}</div>
      <div className="commonInfo">
        <div>
          <p>Your E-mail address</p>
          <p>{userValue.mail}</p>
        </div>
        <div>
          <p>Verified user</p>
          <p>{isVerified ? 'Yes' : 'No'}</p>
        </div>
        <div>
          <p>User Name</p>
          <p>{userValue.name}</p>
        </div>
        <div>
          <p>Tables count</p>
          <p>{userValue.desks ? Object.keys(userValue.desks).length : 0}</p>
        </div>
        <div>
          <p>Tasks Count</p>
          <p>{taskCount}</p>
        </div>
        <div>
          <p>Color theme</p>
          <select
            id="theme"
            onChange={(e) => {
              localStorage.setItem('theme', e.target.value);
              setTheme(e.target.value);
            }}
          >
            <option selected={selected === themes.orange} value={themes.orange}>Orange</option>
            <option selected={selected === themes.blue} value={themes.blue}>Blue</option>
            <option selected={selected === themes.dark} value={themes.dark}>Dark</option>
          </select>
        </div>
      </div>
      <NavLink className="linkToApp" to={`${app}${userValue.uid}`}>
        Your desks
      </NavLink>
      <PasswordActionLink text="change password" link={passReset} />
    </div>
  );
};

const PageNoUser = () => (
  <div className="userPage notAuthUser">
    <p>Sorry, but this page require an authorized user</p>
    <img src="./../errorRobot.png" alt="error" />
  </div>
);

const UserPage: React.FC<{ setTheme:(el:string) => void }> = ({ setTheme }) => {
  const { uid, isVerified } = useContext(AuthUserContext);

  return uid ? (
    <PageWithUser
      isVerified={isVerified}
      userID={uid}
      setTheme={setTheme}
    />
  ) : <PageNoUser />;
};

export default UserPage;
