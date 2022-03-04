import React, { useContext } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { welcome } from '../../../constants/routerLinks';
import { FirebaseContext } from '../../../utils/fireBase';
import './styles.css';

const SingOut = function () {
  const navigate = useNavigate();

  const firebase = useContext(FirebaseContext);

  const onClick = (nav: NavigateFunction) => {
    nav(welcome);
    firebase!.doSignOut();
  };
  return (
    <button type="button" onClick={() => onClick(navigate)} className="singOut">
      Sing Out
    </button>
  );
};
export default SingOut;
