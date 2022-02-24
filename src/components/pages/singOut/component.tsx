import React from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { welcome } from '../../../constants/routerLinks';
import Firebase, { FirebaseContext } from '../../../utils/fireBase';
import './styles.css';

const SingOut = function () {
  const navigate = useNavigate();

  const onClick = (firebase: Firebase, nav: NavigateFunction) => {
    nav(welcome);
    firebase.doSignOut();
  };
  return (
    <FirebaseContext.Consumer>
      {(firebase) => (
        <button
          type="button"
          onClick={() => onClick(firebase, navigate)}
          className="singOut"
        >
          Sing Out
        </button>
      )}
    </FirebaseContext.Consumer>
  );
};
export default SingOut;
