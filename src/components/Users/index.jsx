import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import NavBar from '../NavBar';
import Toast from '../lib/Alert/Toast';
import { CheckLogin } from '../Auth/CheckLogin';

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
            <h1>Users Page</h1>
        </div>
    );
};

export default Users;