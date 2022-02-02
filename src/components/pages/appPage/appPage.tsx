import React from 'react';
import { FirebaseContext } from '../../../utils/fireBase';
import AuthUserContext from '../../../utils/sessionHandler';

const PageWithUser = function () {
  return (
    <FirebaseContext.Consumer>
      {(firebase) => (
        <div className="appPage">
          <div className="commonInfo">
            APP
          </div>
          <div className="functionBlock" />
        </div>
      )}

    </FirebaseContext.Consumer>
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

const AppPage:React.FC = function () {
  return (
    <AuthUserContext.Consumer>
      {(value) => (value ? <PageWithUser /> : <PageNoUser />)}

    </AuthUserContext.Consumer>

  );
};
export default AppPage;
