import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const Home = () => {
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

    useEffect(() => {
        // 로컬 스토리지에서 accessToken 가져오기
        const accessToken = localStorage.getItem('accessToken');
        // axios를 사용하여 POST 요청 보내기
        axios.post('http://10.80.161.45:8080/api/user/profile', null, {
            headers: {
                // mode: 'cors',
                'Authorization': `Bearer ${accessToken}`,
            }
        })
            .then(response => {
                // 요청이 성공적으로 처리됨
                // console.log(response.data.userType);
                const userType = response.data.userType;
                if (userType === 'T') {
                    console.log("로그인 성공");
                    Toast.fire({
                        icon: 'success',
                        title: '로그인 성공 !'
                    })
                }
                else {
                    console.log("유효하지 않은 계정");
                    Toast.fire({
                        icon: 'error',
                        title: '유효하지 않은 게정입니다 !'
                    })
                    navigate("/login");
                }

            })
            .catch(error => {
                // 요청이 실패함
                // console.error(error);
                console.log("로그인 실패");
                navigate("/login");

            });
    }, [navigate, Toast]); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행
    return (
        <div>
            <h1>Home Page</h1>
        </div>
    );
};

export default Home;