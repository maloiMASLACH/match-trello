import React, { useEffect, useState } from 'react';
import { User } from '../../../constants/interfaces';
import Firebase, { FirebaseContext } from '../../../utils/fireBase';
import AuthUserContext from '../../../utils/sessionHandler';
import './adminPage.css';

interface AdminPageBLockRenderProps{
  firebase: Firebase;
}
interface UsersListProps{
  users: User[] | null;
}

const UsersList = function (props:UsersListProps) {
  const { users } = props;
  console.log(users);
  if (users) {
    return (
      <>
        <p className="adminPageTitle">Users</p>
        <div>
          {users.map((user) => (
            <ul>
              <li>{user.mail}</li>
              <li>{user.name}</li>
            </ul>
          ))}
        </div>

      </>
    );
  }
  return null;
};

const AdminPageBLockRender = function (props:AdminPageBLockRenderProps) {
  const { firebase } = props;
  const [users, setUsers] = useState <User[] | null>(null);
  console.log(users);
  useEffect(() => {
    firebase.users().on('value', (snapshot) => {
      setUsers(Object.values(snapshot.val()));
    });
  }, []);
  return (
    <div className="adminPage">
      <div className="usersList">
        <UsersList users={users} />
      </div>
    </div>
  );
};

const PageWithAccess = function () {
  return (
    <FirebaseContext.Consumer>
      {(firebase) => (
        <AdminPageBLockRender firebase={firebase} />
      )}

    </FirebaseContext.Consumer>
  );
};
const PageNoAccess = function () {
  return (
    <div className="userPage notAuthUser">
      <p>Sorry, but this page require an administration rules</p>
      <img src="./errorRobot.png" alt="error" />
    </div>
  );
};

const AdminPage:React.FC = function () {
  return (
    <AuthUserContext.Consumer>
      {(value) => {
        if (value) {
          if (value.email === 'admin@gmail.com') {
            return <PageWithAccess />;
          }
          return <PageNoAccess />;
        }
        return <PageNoAccess />;
      }}

    </AuthUserContext.Consumer>

  );
};
export default AdminPage;
