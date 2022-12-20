import React from 'react';
import classes from 'src/Components/Header/Header.module.css';
import { NavLink } from 'react-router-dom';

export type HeaderPropsType = {
  login: string | null
  auth: boolean
  logout: () => void
}

type LogoutPropsType = {
  login: string | null
  logout: () => void
}

export function Header(props: HeaderPropsType) {
  return (
    <header className={classes.header}>
      <img
        src='https://cdn.logo.com/hotlink-ok/logo-social.png'
        alt='logo' />
      <span className={classes.loginBlock}>
        {
          props.auth
            ? <Logout login={props.login} logout={props.logout} />
            : <NavLink to={'/login'}> Login </NavLink>
        }
      </span>
    </header>
  );
}

function Logout(props: LogoutPropsType) {
  return (
    <div>
      <span>{props.login}</span>
      <button onClick={() => props.logout()}>Logout</button>
    </div>
  );
}
