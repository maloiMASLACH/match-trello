import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RouterLinks } from '../../../constants';
import { UsersListProps, UserType } from '../../../types';
import { FirebaseContext, AuthUserContext } from '../../../utils';
import { LinkButton } from '../../controls';
import './styles.css';

const UsersList = (props: UsersListProps) => {
  const { users } = props;

  const firebase = useContext(FirebaseContext);

  const setAdminRules = (user: UserType) => {
    const { uid, isAdmin } = user;
    firebase.setAdmin(uid).set(!isAdmin);
  };

  return (
    <>
      <p className="adminPageTitle">Users</p>
      <div className="users">
        {users.map((user) => (
          <div className="user">
            <ul>
              <li>{user.mail}</li>
              <li>{user.name}</li>
            </ul>
            <NavLink key={user.uid} to={`${RouterLinks.App}${user.uid}`}>
              <p>Desks</p>
            </NavLink>
            <LinkButton
              className="changeAdmin"
              text={user.isAdmin ? 'remove admin rules' : 'add admin rules'}
              onClick={() => setAdminRules(user)}
            />
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
  const { userId } = useContext(AuthUserContext);

  return userId ? <PageWithAccess /> : <PageNoAccess />;
};

export default AdminPage;
