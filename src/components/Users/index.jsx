import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

import Style from '../../style/Users_style.module.css';
import NavBar from '../NavBar';
import Toast from '../lib/Alert/Toast';
import { CheckLogin } from '../Auth/CheckLogin';

const Flex = styled.div`
    height: 100vh;
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
                    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1999 00:00:10 GMT;;';
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
                    <hr />
                    <div className={Style.users}>
                        {/* TODO 어떻게 유저들 넣을지 구상하기 */}
                    </div>
                </div>
            </Flex>
        </div>

    );
};

export default Users;