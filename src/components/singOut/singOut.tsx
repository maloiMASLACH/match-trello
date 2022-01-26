import React from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { User } from '../../constants/interfaces';
import { welcome } from '../../constants/routerLinks';
import Firebase, { FirebaseContext } from '../../fireBase';
import './singOut.css';

interface SingOutProps{
  setUser:React.Dispatch<React.SetStateAction<User>>,
}

const SingOut = function (props:SingOutProps) {
  const { setUser } = props;
  const navigate = useNavigate();
  const onClick = (firebase:Firebase, nav:NavigateFunction) => {
    firebase.doSignOut().then(() => {
      const newUser:User = { email: '', shortMail: '' };
      setUser(newUser);
      nav(welcome);
    });
  };
  return (
    <FirebaseContext.Consumer>
      {(firebase) => (
        <button type="button" onClick={() => onClick(firebase, navigate)} className="singOut">
          Sing Out
        </button>
      )}

    </FirebaseContext.Consumer>
  );
};
export default SingOut;
