import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { passReset } from '../../../constants/routerLinks';
import AuthUserContext from '../../../utils/sessionHandler';
import PasswordActionLink from '../../controls/passwordChangeLink';
import './styles.css';
import UserValueContext from '../../../utils/valueContexts/userValueContext';

const PageWithUser = () => {
  const userValue = useContext(UserValueContext);

  let taskCount = 0;

  try {
    if (userValue?.desks) {
      Object.values(userValue.desks).forEach((desk) => {
        Object.values(desk!.columns).forEach((column) => {
          taskCount += Object.values(
            column!.tasks,
          ).length;
        });
      });
    }
  } finally {
    if (userValue) {
      return (
        <div className="userPage">
          <div className="userIcon">{userValue.name}</div>
          <div className="commonInfo">
            <div>
              <p>Your E-mail address</p>
              <p>{userValue.mail}</p>
            </div>
            <div>
              <p>User Name</p>
              <p>{userValue.name}</p>
            </div>
            <div>
              <p>Tables count</p>
              <p>{Object.values(userValue.desks).length}</p>
            </div>
            <div>
              <p>Tasks Count</p>
              <p>{taskCount}</p>
            </div>
          </div>
          <div className="linkToAppContainer">
            <NavLink className="linkToApp" to={userValue.uid}>
              Your desks
            </NavLink>
          </div>
          <PasswordActionLink text="change password" link={passReset} />
        </div>
      );
    }
    return <div />;
  }
};

const PageNoUser = () => (
  <div className="userPage notAuthUser">
    <p>Sorry, but this page require an authorized user</p>
    <img src="./errorRobot.png" alt="error" />
  </div>
);

const UserPage: React.FC = () => {
  const user = useContext(AuthUserContext);

  if (user) {
    return <PageWithUser />;
  } return <PageNoUser />;
};

export default UserPage;
