/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { FirebaseContext } from '../../utils/fireBase';
import './userPage.css';

const UserPage:React.FC = function () {
  return (
    <FirebaseContext.Consumer>
      {(firebase) => (
        <div className="userPage">
          <div className="commonInfo">
            <p onClick={() => console.log(firebase)}>
              dqw
            </p>
          </div>
          <div className="functionBlock" />
        </div>
      )}

    </FirebaseContext.Consumer>
  );
};
export default UserPage;
