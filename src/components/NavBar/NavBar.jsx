import React, { useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { links, social } from "./Data";
// import logo from "./logo.svg";

import "../../style/NavBar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    // 메뉴버튼
    const navigate = useNavigate();
    const [showLinks, setShowLinks] = useState(false);
    const linksContainerRef = useRef(null);
    const linksRef = useRef(null);
    const toggleLinks = () => {
        setShowLinks(!showLinks);
    };
    const handleClickUrl = (e) => {
        // console.log(e.target.id);
        navigate(e.target.id);
    }
    useEffect(() => {
        const linksHeight = linksRef.current.getBoundingClientRect().height;
        if (showLinks) {
            linksContainerRef.current.style.height = `${linksHeight}px`;
        } else {
            linksContainerRef.current.style.height = "0px";
        }
    }, [showLinks]);
    return (
        <nav>
            <div className="nav-center">
                <div className="nav-header">
                    {/* <img src={logo} className="logo" alt="logo" /> */}
                    <button className="nav-toggle" onClick={toggleLinks}>
                        <FaBars />
                    </button>
                </div>
                {/* 메뉴버튼 클릭시 목록 보이도록 */}
                <div className="links-container" ref={linksContainerRef}>
                    <ul className="links" ref={linksRef}>
                        {/* data에서 Nav목록 가져오기 */}
                        {links.map((link) => {
                            const { id, url, text } = link;
                            return (
                                <li key={id} onClick={handleClickUrl}>
                                    <div id={url}>{text}</div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                {/* social 아이콘 가져오기 */}
                <ul className="social-icons">
                    {social.map((socialIcon) => {
                        const { id, url, icon } = socialIcon;
                        return (
                            <li key={id}>
                                <a href={url}>{icon}</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
