import React from "react";
import { Link, useNavigate } from "react-router-dom";

import Toast from "../../lib/Alert/Toast";
import Style from "../../style/NavBar_style.module.css";

function NavBar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        Toast.fire({
            icon: "success",
            title: "로그아웃 성공 !",
        });
        localStorage.removeItem("accessToken");

        let date = new Date();
        date.setDate(date.getDate() - 1);

        let willCookie = "";
        willCookie += "refreshToken=Value;";
        willCookie += "Expires=" + date.toUTCString();
        document.cookie = willCookie;

        navigate("/login");
    };
    return (
        <div>
            <header>
                <nav class={Style.header}>
                    <div class={Style.logoContainer}>
                        <Link to="/" className={Style.logo}>
                            Eating
                        </Link>
                    </div>
                    <div class={Style.navContainer}>
                        <Link to="/users" className={Style.navLink}>
                            학생목록
                        </Link>
                        <span className={Style.logout} onClick={handleLogout}>
                            로그아웃
                        </span>
                    </div>
                </nav>
            </header>
        </div>
    );
}

export default NavBar;
