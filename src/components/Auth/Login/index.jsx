import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Style from "../../../style/Login_style.module.css";
import Toast from "../../../lib/Alert/Toast";
import { ReactComponent as Reservation } from "../../../image/LoginLogo.svg";

export const API_URL = process.env.REACT_APP_API;

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const Login = () => {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    if (id === "" || password === "") {
      Toast.fire({
        icon: "error",
        title: "아이디와 비밀번호를 입력해주세요 !",
      });
      return;
    }
    const data = { id, password };
    try {
      const URL = `${API_URL}/api/account/login.do`;
      // 로그인 성공
      const response = await axios.post(URL, data);
      const { accessToken, refreshToken } = response.data.data;
      localStorage.setItem("accessToken", accessToken);
      document.cookie = `refreshToken=${refreshToken}`;
      Toast.fire({
        icon: "success",
        title: "로그인 성공 !",
      });
      navigate("/");
    } catch (error) {
      // 로그인 실패
      const data = error.response.data;
      if (data.message === "Account without") {
        Toast.fire({
          icon: "error",
          title: "존재하지않는 아이디입니다.",
        });
      } else if (data.message === "Credentials failed.") {
        Toast.fire({
          icon: "error",
          title: "비밀번호가 일치하지 않습니다.",
        });
      } else {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "로그인 실패",
        });
      }
    }
  };

  return (
    <div>
      <Flex>
        <form className={Style.form} onKeyPress={onKeyPress}>
          <div className={Style.Ang_Text}>로그인</div>
          <Reservation />
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
          <button className={Style.button} type="button" onClick={handleLogin}>
            로그인
          </button>
          <div className={Style.Goto_Signin_Text}>
            아직 회원이 아니신가요?&nbsp;
            <span
              className={Style.Goto_Signin_Href}
              onClick={() => {
                navigate("/signup");
              }}
            >
              회원가입
            </span>
          </div>
        </form>
      </Flex>
    </div>
  );
};

export default Login;
