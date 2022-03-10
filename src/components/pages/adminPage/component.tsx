import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UserType } from '../../../types/globalTypes';
import { FirebaseContext } from '../../../utils/fireBase';
import AuthUserContext from '../../../utils/sessionHandler';
import './styles.css';

import { UsersListProps } from '../../../types/adminPage';

const UsersList = (props: UsersListProps) => {
  const { users } = props;

  if (users) {
    return (
      <>
        <p className="adminPageTitle">Users</p>
        <div>
          {users.map((user) => (
            <NavLink key={user.uid} to={user.uid}>
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

const PageWithAccess = () => {
  const firebase = useContext(FirebaseContext);

  const [users, setUsers] = useState<UserType[]>([]);

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

const PageNoAccess = () => (
  <div className="userPage notAuthUser">
    <p>Sorry, but this page require an administration rules</p>
    <img src="./errorRobot.png" alt="error" />
  </div>
);

const AdminPage: React.FC = () => {
  const user = useContext(AuthUserContext);

  if (user && user.email === 'admin@gmail.com') {
    return <PageWithAccess />;
  }
  return <PageNoAccess />;
};

export default AdminPage;
