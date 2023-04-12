import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

function NavBar() {

    return (
        <div>
            <header>
                <nav className='header'>
                    <Link to="/" className='logo'>Eating</Link>
                    <div className='texts'>
                        {/* <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link> |{" "} */}
                        <Link to="/users" className='clicker'>유저목록</Link>
                        {/* <Link to="/match" className='clicker'>선배와1:1면담</Link> |{" "}
                        <Link to="/information" className='clicker'>우리학교 소개</Link> |{" "}
                        <Link to="/band" className='clicker'>동아리 밴드</Link> |{" "}
                        <Link to="/chatings" className='clicker'>잡담</Link> |{" "}
                        <Link to="/profile" className='clicker'>내 - 프로필</Link> */}
                    </div>
                    <div className='HambugerMenu'>
                        <input type="checkbox" id="check_box" />
                        <label for="check_box">
                            <span></span>
                            <span></span>
                            <span></span>
                        </label>
                        <div id="side_menu">
                            <ul className='HambugerClickerUl'>
                                <Link to="/" className='BlockText'>
                                    <div className='HambugerClicker'>홈</div>
                                </Link>
                                {/* <br /> */}
                                <Link to="/users" className='BlockText'>
                                    <div className='HambugerClicker'>유저목록</div>
                                </Link>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default NavBar;