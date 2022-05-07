import { GetUserMailsProps } from '../../types';

const GetUserMails = (props: GetUserMailsProps) => {
  const {
    users, uid, selectedMail, setUsers, setUsersMails, setUserId,
  } = props;
  const usersArr = Object.values(users);

  usersArr.splice(usersArr.indexOf(users[uid.slice(1)]), 1);

  const usersMailsArr = usersArr.map((user) => user.mail);
  usersMailsArr.unshift('');

  setUsers(usersArr);
  setUsersMails(usersMailsArr);
  setUserId(selectedMail ? usersMailsArr.indexOf(selectedMail) - 1 : -1);
};

export default GetUserMails;
