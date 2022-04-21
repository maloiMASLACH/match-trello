import React, { useContext, useEffect, useState } from 'react';
import { AssignmentPageType } from '../../../types/assignmentPage';
import { UserType } from '../../../types/globalTypes';
import { FirebaseContext } from '../../../utils/fireBase';
import AuthUserContext from '../../../utils/sessionHandler';
import AssignedBlock from '../../blocks/assignedBlock';
import './styles.css';

const PageWithUser = (props: AssignmentPageType) => {
  const { userID } = props;

  const firebase = useContext(FirebaseContext);

  const [userValue, setUserValue] = useState<UserType>({
    desks: [],
    mail: '',
    uid: '',
    name: '',
    requests: { sended: {}, received: {} },
    assignments: {},
  });

  useEffect(() => {
    firebase.user(userID).on('value', (snapshot) => {
      setUserValue(snapshot.val());
    });
  }, []);

  return (
    <AssignedBlock assignments={userValue.assignments} />
  );
};

const PageNoUser = () => (
  <div className="userPage notAuthUser">
    <p>Sorry, but this page require an authorized user</p>
    <img src="./../errorRobot.png" alt="error" />
  </div>
);

const AssignmentPage = () => {
  const { userId } = useContext(AuthUserContext);

  return userId ? (
    <PageWithUser userID={userId} />
  ) : (
    <PageNoUser />
  );
};

export default AssignmentPage;
