import { UserType } from '../../types/globalTypes';

interface GetUserMailsProps {
  users: { [key: string]: UserType };
  uid: string;
  setUsers: (e: UserType[]) => void;
  setUsersMails: (e: string[]) => void;
}

const GetUserMails = (props: GetUserMailsProps) => {
  const {
    users, uid, setUsers, setUsersMails,
  } = props;
  const usersArr = Object.values(users);

  usersArr.splice(usersArr.indexOf(users[uid.slice(1)]), 1);

  const usersMailsArr = usersArr.map((user) => user.mail);
  usersMailsArr.unshift('');

  setUsers(usersArr);
  setUsersMails(usersMailsArr);
};

export default GetUserMails;
