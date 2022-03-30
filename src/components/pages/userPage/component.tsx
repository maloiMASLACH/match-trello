import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import RouterLinks from '../../../constants/routerLinks';
import AuthUserContext from '../../../utils/sessionHandler';
import PasswordActionLink from '../../controls/passwordChangeLink';
import './styles.css';
import { FirebaseContext } from '../../../utils/fireBase';
import { UserType } from '../../../types/globalTypes';
import { PageWithUserProps, UserPageProps } from '../../../types/userPage';
import themes from '../../../constants/themes';
import localStorageKeys from '../../../constants/localStorageKeys';
import Select from '../../controls/select';

const PageWithUser = (props: PageWithUserProps) => {
  const { isVerified, userID, handleTheme } = props;

  const firebase = useContext(FirebaseContext);

  const [userValue, setUserValue] = useState<UserType>({
    desks: [],
    mail: '',
    uid: '',
    name: '',
  });

  let taskCount = 0;

  const selected = localStorage.getItem(localStorageKeys.Theme) || themes[0];

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
          <Select
            id="theme"
            values={themes}
            onChange={handleTheme}
            selected={selected}
          />
        </div>
      </div>
      <NavLink className="linkToApp" to={`${RouterLinks.App}${userValue.uid}`}>
        Your desks
      </NavLink>
      <PasswordActionLink text="change password" link={RouterLinks.PassReset} />
    </div>
  );
};

const PageNoUser = () => (
  <div className="userPage notAuthUser">
    <p>Sorry, but this page require an authorized user</p>
    <img src="./../errorRobot.png" alt="error" />
  </div>
);

const UserPage = (props: UserPageProps) => {
  const { handleTheme } = props;

  const { uid, isVerified } = useContext(AuthUserContext);

  return uid ? (
    <PageWithUser
      isVerified={isVerified}
      userID={uid}
      handleTheme={handleTheme}
    />
  ) : (
    <PageNoUser />
  );
};

export default UserPage;
