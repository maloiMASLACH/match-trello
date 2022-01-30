import React from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { welcome } from '../../constants/routerLinks';
import Firebase, { FirebaseContext } from '../../utils/fireBase';
import './singOut.css';

const SingOut = function () {
  const navigate = useNavigate();
  const onClick = (firebase:Firebase, nav:NavigateFunction) => {
    firebase.doSignOut().then(() => {
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
