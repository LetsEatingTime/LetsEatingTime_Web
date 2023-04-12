import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import Toast from '../../lib/Alert/Toast';
import './style.css';
import { ReactComponent as Reservation } from '../../../image/LoginLogo.svg';

const Flex = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
`

const Login = () => {
    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleIdChange = (event) => {
        setId(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const onKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    }

    const handleLogin = async () => {
        if (id === '' || password === '') {
            Toast.fire({
                icon: 'error',
                title: '아이디와 비밀번호를 입력해주세요 !'
            })
            return;
        }
        const data = { id, password };
        try {
            // 로그인 성공
            const response = await axios.post('http://10.80.161.45:8080/api/account/login.do', data);
            const { accessToken, refreshToken } = response.data;
            localStorage.setItem('accessToken', accessToken);
            document.cookie = `refreshToken=${refreshToken}`;
            Toast.fire({
                icon: 'success',
                title: '로그인 성공 !'
            })
            navigate("/");
        } catch (error) {
            // 로그인 실패 
            Toast.fire({
                icon: 'error',
                title: '로그인 실패 !'
            })
            // console.log(error);
        }
    }

    return (
        <div>
            <Flex>
                <form className='form' onKeyPress={onKeyPress}>
                    <div className='Ang-Text'>로그인</div>
                    <Reservation />
                    <input className='input' type='text' id='input-id' placeholder='Username' value={id} onChange={handleIdChange}></input>
                    <input className='input' type='password' id='input-pw' placeholder='Password' value={password} onChange={handlePasswordChange}></input>
                    <button className='button' type='button' onClick={handleLogin}>로그인</button>
                    <div className='Goto-Signin-Text'>아직 회원이 아니신가요?&nbsp;
                        <span className='Goto-Signin-Href' onClick={() => { navigate('/signup') }}>회원가입</span>
                    </div>
                </form>
            </Flex>
        </div>
    );
};

export default Login;
