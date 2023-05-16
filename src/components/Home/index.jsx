import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Toast from "../../lib/Alert/Toast";
import NavBar from "../NavBar";
import { CheckLogin } from "../../hooks/CheckLogin";
import Piechart from "../Chart/Pie";
import Meal from "../Meal";
import BarChart from "../Chart/Bar";

const Flex = styled.div`
    display: flex;
    /* flex-direction: row; */
    /* flex-wrap: wrap; */
    /* justify-content: center; */
    /* align-items: center; */
    margin-left: 30%;
`;

const Home = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        CheckLogin(accessToken).then((isTeacher) => {
            if (isTeacher) {
                console.log("로그인 성공");
            } else {
                console.log("유효하지 않은 계정");
                Toast.fire({
                    icon: "warning",
                    title: "유효하지 않은 게정입니다 !",
                });
                localStorage.removeItem("accessToken");

                let date = new Date();
                date.setDate(date.getDate() - 1);

                let willCookie = "";
                willCookie += "refreshToken=Value;";
                willCookie += "Expires=" + date.toUTCString();
                document.cookie = willCookie;

                navigate("/login");
            }
        });
    }, [navigate]); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행
    return (
        <div>
            <NavBar />
            <h1>현재 급식은..</h1>
            <div>
                <Flex>
                    <Piechart />
                    <BarChart />
                </Flex>
                <Meal />
            </div>
        </div>
    );
};

export default Home;
