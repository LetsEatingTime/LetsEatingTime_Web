import React, { useEffect } from 'react';
// import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Toast from '../lib/Alert/Toast';
// import styled from 'styled-components';
import NavBar from '../NavBar';
import { CheckLogin } from '../Auth/CheckLogin';

// const Flex = styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     flex-direction: column;
//     height: 100vh;
// `

const Home = () => {
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
                    document.cookie = 'refreshToken=; path=/;';
                    navigate('/login');
                }
            });
    }, [navigate]); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행
    return (
        <div>
            <NavBar />
            <h1>Home Page</h1>
        </div>
    );
};

export default Home;