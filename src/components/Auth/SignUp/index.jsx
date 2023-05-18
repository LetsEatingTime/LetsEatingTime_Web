import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Style from "../../../style/Signup_style.module.css";
import Toast from "../../../lib/Alert/Toast";

export const API_URL = process.env.REACT_APP_API;

const Flex = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
`;

const SignUp = () => {
    const navigate = useNavigate();

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleIdChange = (event) => {
        setId(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const onKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSignin();
        }
    };

    const handleSignin = async () => {
        const URL = `${API_URL}/api/account/signup.do`;

        if (id === "" || password === "" || name === "") {
            Toast.fire({
                icon: "error",
                title: "정보를 빠짐없이 입력해주세요 !",
            });
            return;
        }
        const data = {
            id: id,
            password: password,
            name: name,
            userType: "T",
            grade: 9,
            className: 0,
            classNo: 0,
        };
        try {
            // 회원가입 성공
            const response = await axios.post(URL, data); // 회원가입 API
            // console.log(response);
            if (response.status === 200) {
                Toast.fire({
                    icon: "success",
                    title: name + "님 회원가입 요청이 완료되었습니다 !",
                });
                navigate("/login");
            } else {
                Toast.fire({
                    icon: "error",
                    title: "회원가입 실패 :: 관리자에게 문의하세요",
                });
            }
        } catch (error) {
            // 회원가입 실패
            if (error.response.status === 400) {
                Toast.fire({
                    icon: "error",
                    title: "이미 존재하는 아이디입니다",
                });
            } else {
                Toast.fire({
                    icon: "error",
                    title: "회원가입 실패 :: 관리자에게 문의하세요",
                });
            }
            console.log(error);
        }
    };
    return (
        <div>
            <div>
                <Flex>
                    <form className={Style.form} onKeyPress={onKeyPress}>
                        <div className={Style.Ang_Text}>회원가입</div>
                        {/* <Reservation /> */}
                        <div className={Style.inputs}>
                            <input
                                className={Style.input}
                                type="text"
                                id="input-id"
                                placeholder="Username"
                                value={id}
                                onChange={handleIdChange}
                            ></input>
                            <input
                                className={Style.input}
                                type="password"
                                id="input-pw"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                            ></input>
                            <input
                                className={Style.input}
                                type="text"
                                id="input-name"
                                placeholder="Name"
                                value={name}
                                onChange={handleNameChange}
                            ></input>
                        </div>
                        <button className={Style.button} type="button" onClick={handleSignin}>
                            회원가입
                        </button>
                        <div className={Style.Goto_Signup_Text}>
                            회원이신가요 ?&nbsp;
                            <span
                                className={Style.Goto_Signup_Href}
                                onClick={() => {
                                    navigate("/login");
                                }}
                            >
                                로그인
                            </span>
                        </div>
                    </form>
                </Flex>
            </div>
        </div>
    );
};

export default SignUp;
