import React from 'react';
import classes from './Header.module.css';

function Header() {
    return (
        <header className={classes.header}>
            <img src='https://untappd.akamaized.net/site/brewery_logos/brewery-438986_7160b.jpeg' alt=''/>
        </header>
    );
}

export default Header;