import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

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

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleIdChange = (event) => {
        setId(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleLogin = async () => {
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
            console.log(error);
        }
    }

    return (
        <div>
            <Flex>
                <form className='form'>
                    <div className='Ang-Text'>로그인</div>
                    <Reservation />
                    <input className='input' type='text' id='input-id' value={id} onChange={handleIdChange}></input>
                    <input className='input' type='password' id='input-pw' value={password} onChange={handlePasswordChange}></input>
                    <button className='button' type='button' onClick={handleLogin}>로그인</button>
                    <div className='Goto-Signin-Text'>아직 회원이 아니신가요?&nbsp;
                        <span className='Goto-Signin-Href'>회원가입</span>
                    </div>
                </form>
            </Flex>
        </div>
    );
};

export default Login;
