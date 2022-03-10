import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { passReset } from '../../../constants/routerLinks';
import AuthUserContext from '../../../utils/sessionHandler';
import PasswordActionLink from '../../controls/passwordChangeLink';
import './styles.css';
import { FirebaseContext } from '../../../utils/fireBase';
import { UserType } from '../../../types/globalTypes';

const PageWithUser = (props:{ uid:string }) => {
  const { uid } = props;
  const firebase = useContext(FirebaseContext);

  const [userValue, setUserValue] = useState<UserType>({
    desks: [], mail: '', uid: '', name: '',
  });

  let taskCount = 0;

  useEffect(() => {
    firebase.user(uid).on('value', (snapshot) => {
      setUserValue(snapshot.val());
    });
  }, []);

  try {
    if (userValue.desks) {
      Object.values(userValue.desks).forEach((desk) => {
        Object.values(desk.columns).forEach((column) => {
          taskCount += Object.keys(column.tasks).length;
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
              <p>
                {userValue.desks ? Object.keys(userValue.desks).length : 0}
              </p>
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
    return <PageWithUser uid={user?.uid} />;
  }
  return <PageNoUser />;
};

export default UserPage;
