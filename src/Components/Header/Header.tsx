import React from 'react';
import classes from './Header.module.css';
import {NavLink} from 'react-router-dom';

export type HeaderPropsType = {
    login: string | null
    setAuthUserData: (id: number, email: string, login: string,) => void
    auth: boolean
}

function Header(props: HeaderPropsType) {
    return (
        <header className={classes.header}>
            <img src='https://untappd.akamaized.net/site/brewery_logos/brewery-438986_7160b.jpeg' alt=''/>
            <span className={classes.loginBlock}>
                {props.auth ? props.login : <NavLink to={'/login'}> Login </NavLink>}
            </span>
        </header>
    );
}

export default Header;