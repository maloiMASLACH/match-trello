import React, { useContext } from 'react';
import AuthUserContext from '../../../utils/sessionHandler';
import './styles.css';

const WelcomePage: React.FC = () => {
  const { uid } = useContext(AuthUserContext);

  return (
    <div className="welcomeBlock">
      <h1>Welcome</h1>
      <p>
        This site will allow you to keep all your plans not only in your head,
        but also in a more reliable place.
      </p>
      {!uid && <p>All you need to do is log in, or register if you`re new.</p>}
      <p className="welcomeClue">Look in the upper right corner</p>
    </div>
  );
};

export default WelcomePage;
