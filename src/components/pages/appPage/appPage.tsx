import React, { useEffect, useState } from 'react';
import { User } from '../../../constants/interfaces';
import Firebase, { FirebaseContext } from '../../../utils/fireBase';
import AuthUserContext from '../../../utils/sessionHandler';
import DeckWithInfo from '../../deckWithInfo/deckWithInfo';
import NewDeck from '../../newDeck/newDeck';
import './appPage.css';

interface AppPageProps{
  path: string
}

interface PageWithUserProps{
  firebase: Firebase,
  path: string
}

const PageWithUser = function (props: PageWithUserProps) {
  const { firebase, path } = props;
  const [userState, setUserState] = useState <User>({
    mail: '', name: '', uid: path, decks: {},
  });
  useEffect(() => {
    firebase.user(path).on('value', (snapshot) => {
      setUserState(snapshot.val());
    });
  }, []);

  return (
    <div className="appPage">
      {userState.decks ? Object.keys(userState.decks).map(
        (deckName) => (
          <DeckWithInfo
            deckInfo={userState.decks[deckName]}
            deckName={deckName}
            userState={userState}
            setUserState={setUserState}
          />
        ),
      ) : null}
      <NewDeck userState={userState} setUserState={setUserState} />
    </div>
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

const AppPage:React.FC<AppPageProps> = function (props) {
  const { path } = props;
  return (
    <AuthUserContext.Consumer>
      {(value) => (value ? (
        <FirebaseContext.Consumer>
          {(firebase) => (
            <PageWithUser firebase={firebase} path={path} />
          )}

        </FirebaseContext.Consumer>
      ) : <PageNoUser />)}

    </AuthUserContext.Consumer>

  );
};
export default AppPage;
