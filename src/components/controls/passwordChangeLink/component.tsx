import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles.css';
import { ChangeLinkProps } from '../../../types/passwordChangeLink';

const PasswordActionLink = (props: ChangeLinkProps) => {
  const { text, link } = props;

  return (
    <NavLink className="passwordProblem" to={link}>
      {text}
    </NavLink>
  );
};

export default PasswordActionLink;
