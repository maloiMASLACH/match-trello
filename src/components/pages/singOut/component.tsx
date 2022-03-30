import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import RouterLinks from '../../../constants/routerLinks';
import { FirebaseContext } from '../../../utils/fireBase';
import './styles.css';

const SingOut = () => {
  const navigate = useNavigate();

  const firebase = useContext(FirebaseContext);

  const onClick = () => {
    navigate(RouterLinks.Welcome);
    firebase.doSignOut();
  };

  return (
    <button type="button" onClick={onClick} className="singOut">
      Sing Out
    </button>
  );
};

export default SingOut;
