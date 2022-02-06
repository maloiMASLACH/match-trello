import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { User } from '../../../constants/interfaces';
import { passReset, app } from '../../../constants/routerLinks';
import Firebase, { FirebaseContext } from '../../../utils/fireBase';
import AuthUserContext from '../../../utils/sessionHandler';
import PasswordActionLink from '../../passwordChangeLink/passwordChangeLink';
import './userPage.css';

interface PageWithUserProps{
  user: any
  firebase: Firebase
}

interface UserPageBlockRenderProps{
  userInfo: User | null
}

const UserPageBlockRender = function (props:UserPageBlockRenderProps) {
  const { userInfo } = props;
  let taskCount = 0;
  if (userInfo?.decks) {
    Object.keys(userInfo.decks).forEach(
      (colon) => { taskCount += Object.keys(userInfo.decks[colon]).length; },
    );
  }
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
            <p>{Object.keys(userInfo.decks).length}</p>
          </div>
          <div>
            <p>Tasks Count</p>
            <p>{taskCount}</p>
          </div>
        </div>
        <div className="linkToAppContainer">
          <NavLink className="linkToApp" to={userInfo.uid}>Your decks</NavLink>
        </div>
        <PasswordActionLink text="change password" link={passReset} />
      </div>
    );
  } return <div />;
};

const PageWithUser = function (props:PageWithUserProps) {
  const { user, firebase } = props;
  const [userInfo, setUserInfo] = useState <User | null>(null);
  useEffect(() => {
    firebase.user(user.uid).on('value', (snapshot) => {
      setUserInfo(snapshot.val());
    });
  }, []);
  return (
    <UserPageBlockRender userInfo={userInfo} />
  );
};
const PageNoUser = function () {
  return (
    <div className="userPage notAuthUser">
      <p>Sorry, but this page require an authorized user</p>
      <img src="./errorRobot.png" alt="error" />
    </div>
  );
};

const UserPage:React.FC = function () {
  return (
    <AuthUserContext.Consumer>
      {(value) => (value ? (
        <FirebaseContext.Consumer>
          {(firebase) => (
            <PageWithUser user={value} firebase={firebase} />
          )}

        </FirebaseContext.Consumer>
      ) : <PageNoUser />)}

    </AuthUserContext.Consumer>

  );
};
export default UserPage;
