import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UserType } from '../../../types/globalTypes';
import { FirebaseContext } from '../../../utils/fireBase';
import AuthUserContext from '../../../utils/sessionHandler';
import './styles.css';
import { UsersListProps } from '../../../types/adminPage';
import RouterLinks from '../../../constants/routerLinks';

const UsersList = (props: UsersListProps) => {
  const { users } = props;

  return (
    <>
      <p className="adminPageTitle">Users</p>
      <div>
        {users.map((user) => (
          <div className="user">
            <ul>
              <li>{user.mail}</li>
              <li>{user.name}</li>
            </ul>
            <NavLink key={user.uid} to={`${RouterLinks.App}${user.uid}`}>
              <p>Desks</p>
            </NavLink>
            <NavLink key={user.uid} to={`${RouterLinks.Requests}${user.uid}`}>
              <p>Requests</p>
            </NavLink>
          </div>
        ))}
      </div>
    </>
  );
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
        {users.length && <UsersList users={users} />}
      </div>
    </div>
  );
};

const PageNoAccess = () => (
  <div className="userPage notAuthUser">
    <p>Sorry, but this page require an administration rules</p>
    <img src="./../errorRobot.png" alt="error" />
  </div>
);

const AdminPage: React.FC = () => {
  const { uid } = useContext(AuthUserContext);

  return uid ? <PageWithAccess /> : <PageNoAccess />;
};

export default AdminPage;
