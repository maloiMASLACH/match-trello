import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserType } from '../../../types/globalTypes';
import { RequestPageWithUserProps } from '../../../types/requestPage';
import { FirebaseContext } from '../../../utils/fireBase';
import AuthUserContext from '../../../utils/sessionHandler';
import RequesterContext from '../../../utils/valueContexts/requesterContext';
import SenderContext from '../../../utils/valueContexts/senderContext';
import RequestList from '../../blocks/requestList';
import RequestPageForm from '../../blocks/requestSendForm';
import SendedList from '../../blocks/sendedList';
import './styles.css';

const PageWithUser = (props: RequestPageWithUserProps) => {
  const { currentId } = props;

  const firebase = useContext(FirebaseContext);

  const [userValue, setUserValue] = useState<UserType>();

  useEffect(() => {
    firebase.user(currentId).on('value', (snapshot) => {
      setUserValue(snapshot.val());
    });
  }, []);

  return (
    <div className="requestPage">
      <div className="sendRequestBlock">
        <p className="requestPageTitle">New request</p>
        <RequestPageForm
          userMail={userValue?.mail || ''}
          userKey={userValue?.uid || ''}
          currentId={currentId}
        />
      </div>
      <div className="sendRequestBlock">
        <p className="requestPageTitle">Sended request</p>
        {userValue?.requests?.sended
          && Object.values(userValue.requests.sended).map((requester) => (
            <SenderContext.Provider
              value={requester.sender}
              key={requester.sender.key}
            >
              {requester.tasks && (
                <SendedList requester={requester} currentId={currentId} />
              )}
            </SenderContext.Provider>
          ))}
      </div>
      <div className="sendRequestBlock">
        <p className="requestPageTitle">Received tasks</p>
        {userValue?.requests?.received
          && Object.values(userValue.requests.received || []).map((requester) => (
            <RequesterContext.Provider
              value={requester.sender}
              key={requester.sender.key}
            >
              {requester.tasks && (
                <RequestList requester={requester} currentId={currentId} />
              )}
            </RequesterContext.Provider>
          ))}
      </div>
    </div>
  );
};

const PageNoUser = () => (
  <div className="userPage notAuthUser">
    <p>Sorry, but this page require an authorized user</p>
    <img src="./../errorRobot.png" alt="error" />
  </div>
);

const RequestPage = () => {
  const { uid } = useParams();

  const { userId, isAdmin } = useContext(AuthUserContext);

  return uid && (uid === userId || isAdmin) ? (
    <PageWithUser currentId={userId} />
  ) : (
    <PageNoUser />
  );
};

export default RequestPage;
