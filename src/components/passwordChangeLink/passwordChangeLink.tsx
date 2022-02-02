import React from 'react';
import { NavLink } from 'react-router-dom';
import './passwordChangeLink.css';

interface ChangeLinkProps{
  text: string;
  link:string;
}

const PasswordActionLink = function (props:ChangeLinkProps) {
  const { text, link } = props;
  return (
    <div className="passwordProblem">
      <NavLink to={link}>
        {text}
      </NavLink>
    </div>
  );
};
export default PasswordActionLink;
