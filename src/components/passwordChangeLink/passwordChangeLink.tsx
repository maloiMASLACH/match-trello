import React from 'react';
import { NavLink } from 'react-router-dom';
import './passwordChangeLink.css';
import { ChangeLinkProps } from './passwordChangeLinkTypes';

const PasswordActionLink = (props: ChangeLinkProps) => {
  const { text, link } = props;

  return (
    <div className="passwordProblem">
      <NavLink to={link}>{text}</NavLink>
    </div>
  );
};
export default PasswordActionLink;
