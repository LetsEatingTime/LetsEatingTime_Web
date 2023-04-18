import React from 'react';
import { Link } from 'react-router-dom';

import Style from '../../style/NavBar_style.module.css';

function NavBar() {

    return (
        <div>
            <header>
                <nav className={Style.header}>
                    <Link to="/" className={Style.logo}>Eating</Link>
                    <div className={Style.texts}>
                        {/* <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link> |{" "} */}
                        <Link to="/users" className={Style.clicker}>유저목록</Link>
                        {/* <Link to="/match" className='clicker'>선배와1:1면담</Link> |{" "}
                        <Link to="/information" className='clicker'>우리학교 소개</Link> |{" "}
                        <Link to="/band" className='clicker'>동아리 밴드</Link> |{" "}
                        <Link to="/chatings" className='clicker'>잡담</Link> |{" "}
                        <Link to="/profile" className='clicker'>내 - 프로필</Link> */}
                    </div>
                    {/* <div className={Style.HambugerMenu}>
                        <input type="checkbox" className={Style.check_box} />
                        <label for="check_box">
                            <span></span>
                            <span></span>
                            <span></span>
                        </label>
                        <div className={Style.side_menu}>
                            <ul className={Style.HambugerClickerUl}>
                                <Link to="/" className={Style.BlockText}>
                                    <div className={Style.HambugerClicker}>홈</div>
                                </Link>
                                <Link to="/users" className={Style.BlockText}>
                                    <div className={Style.HambugerClicker}>유저목록</div>
                                </Link>
                            </ul>
                        </div>
                    </div> */}
                </nav>
            </header>
        </div>
    )
}

export default NavBar;