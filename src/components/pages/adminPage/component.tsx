import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UserType } from '../../../types/globalTypes';
import { FirebaseContext } from '../../../utils/fireBase';
import AuthUserContext from '../../../utils/sessionHandler';
import './styles.css';
import { UsersListProps, AdminPageBLockRenderProps } from '../../../types/adminPage';

const UsersList = (props: UsersListProps) => {
  const { users } = props;

  if (users) {
    return (
      <>
        <p className="adminPageTitle">Users</p>
        <div>
          {users.map((user) => (
            <NavLink to={user.uid}>
              <ul>
                <li>{user.mail}</li>
                <li>{user.name}</li>
              </ul>
            </NavLink>
          ))}
        </div>
      </>
    );
  }
  return null;
};

const AdminPageBLockRender = (props: AdminPageBLockRenderProps) => {
  const { firebase } = props;

  const [users, setUsers] = useState<UserType[] | null>(null);

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

const PageWithAccess = () => (
  <FirebaseContext.Consumer>
    {(firebase) => <AdminPageBLockRender firebase={firebase} />}
  </FirebaseContext.Consumer>
);
const PageNoAccess = () => (
  <div className="userPage notAuthUser">
    <p>Sorry, but this page require an administration rules</p>
    <img src="./errorRobot.png" alt="error" />
  </div>
);

const AdminPage: React.FC = () => (
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
export default AdminPage;
