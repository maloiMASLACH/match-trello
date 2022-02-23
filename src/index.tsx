/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Firebase, { FirebaseContext } from './utils/fireBase';

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={new Firebase()}>
      <FirebaseContext.Consumer>
        {(firebase) => (
          <App firebase={firebase} />
        )}

      </FirebaseContext.Consumer>
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
