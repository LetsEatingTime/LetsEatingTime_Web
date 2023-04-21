import React from 'react';
import { Link } from 'react-router-dom';

import Style from '../../style/NavBar_style.module.css';

function NavBar() {

    return (
        <div>
            <header>
                <nav class={Style.header}>
                    <div class={Style.logoContainer}>
                        <Link to="/" className={Style.logo}>Eating</Link>
                    </div>
                    <div class={Style.navContainer}>
                        <Link to="/users" className={Style.navLink}>학생목록</Link>
                    </div>
                </nav>
            </header>
        </div>

    )
}

export default NavBar;