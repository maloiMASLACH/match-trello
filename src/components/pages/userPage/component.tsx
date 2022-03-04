import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UserType } from '../../../types/globalTypes';
import { passReset } from '../../../constants/routerLinks';
import { FirebaseContext } from '../../../utils/fireBase';
import AuthUserContext from '../../../utils/sessionHandler';
import PasswordActionLink from '../../controls/passwordChangeLink';
import './styles.css';
import { UserPageBlockRenderProps, PageWithUserProps } from '../../../types/userPage';

const UserPageBlockRender = (props: UserPageBlockRenderProps) => {
  const { userInfo } = props;
  let taskCount = 0;

  try {
    if (userInfo?.desks) {
      Object.values(userInfo.desks).forEach((desk) => {
        Object.values(desk!.columns).forEach((column) => {
          taskCount += Object.values(
            column!.tasks,
          ).length;
        });
      });
    }
  } finally {
    if (userInfo) {
      return (
        <div className="userPage">
          <div className="userIcon">{userInfo.name}</div>
          <div className="commonInfo">
            <div>
              <p>Your E-mail address</p>
              <p>{userInfo.mail}</p>
            </div>
            <div>
              <p>User Name</p>
              <p>{userInfo.name}</p>
            </div>
            <div>
              <p>Tables count</p>
              <p>{Object.values(userInfo.desks).length}</p>
            </div>
            <div>
              <p>Tasks Count</p>
              <p>{taskCount}</p>
            </div>
          </div>
          <div className="linkToAppContainer">
            <NavLink className="linkToApp" to={userInfo.uid}>
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

const PageWithUser = (props: PageWithUserProps) => {
  const { user, firebase } = props;

  const [userInfo, setUserInfo] = useState<UserType | null>(null);

  useEffect(() => {
    firebase.user(user.uid).on('value', (snapshot) => {
      setUserInfo(snapshot.val());
    });
  }, []);

  return <UserPageBlockRender userInfo={userInfo} />;
};

const PageNoUser = () => (
  <div className="userPage notAuthUser">
    <p>Sorry, but this page require an authorized user</p>
    <img src="./errorRobot.png" alt="error" />
  </div>
);

const UserPage: React.FC = () => (
  <AuthUserContext.Consumer>
    {(value) => (value ? (
      <FirebaseContext.Consumer>
        {(firebase) => <PageWithUser user={value} firebase={firebase} />}
      </FirebaseContext.Consumer>
    ) : (
      <PageNoUser />
    ))}
  </AuthUserContext.Consumer>
);
export default UserPage;
