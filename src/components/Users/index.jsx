import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

import Style from '../../style/Users_style.module.css';
import NavBar from '../NavBar';
import Toast from '../lib/Alert/Toast';
import { CheckLogin } from '../Auth/CheckLogin';

const Flex = styled.div`
    height: 100vh;
    /* justify-content: center;
    align-items: center;
    flex-direction: column; */
`

const Users = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        CheckLogin(accessToken)
            .then(isTeacher => {
                if (isTeacher) {
                    console.log('로그인 성공');
                } else {
                    console.log('유효하지 않은 계정');
                    Toast.fire({
                        icon: 'warning',
                        title: '유효하지 않은 게정입니다 !'
                    });
                    localStorage.removeItem('accessToken');

                    let date = new Date();
                    date.setDate(date.getDate() - 1);

                    let willCookie = "";
                    willCookie += "refreshToken=Value;";
                    willCookie += "Expires=" + date.toUTCString();
                    document.cookie = willCookie;

                    navigate('/login');
                }
            });
    }, [navigate]); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행
    return (
        <div>
            <NavBar />
            <Flex>
                <h1>학생목록</h1>
                <button className={Style.btn} id='grade_1'>1학년</button>
                <button className={Style.btn} id='grade_2'>2학년</button>
                <button className={Style.btn} id='grade_3'>3학년</button>
                <div className={Style.grade_1_text}>
                    <h2>1학년</h2>
                    <hr className={Style.hr}/>
                    <div className={Style.users}>
                        <div className={Style.user}>
                            <span>유저1</span>
                        </div>
                        <div className={Style.user}>
                            
                            <span>유저1</span>
                        </div>
                    </div>
                </div>
                <div className={Style.grade_1_text}>
                    <h2>2학년</h2>
                    <hr className={Style.hr}/>
                    <div className={Style.users}>
                        <div className={Style.user}>
                            <span>유저1</span>
                        </div>
                        <div className={Style.user}>
                            
                            <span>유저1</span>
                        </div>
                    </div>

                </div>
                <div className={Style.grade_1_text}>
                    <h2>3학년</h2>
                    <hr className={Style.hr}/>
                    <div className={Style.users}>
                        <div className={Style.user}>
                            <span>유저1</span>
                        </div>
                        <div className={Style.user}>
                            
                            <span>유저1</span>
                        </div>
                    </div>

                </div>
            </Flex>
        </div>

    );
};

export default Users;