import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Style from "../../../style/StudentSignup_style.module.css";
import Toast from "../../../lib/Alert/Toast";

export const API_URL = process.env.REACT_APP_API;

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const StudentSignUp = () => {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [className, setClassName] = useState("");
  const [classNo, setClassNo] = useState("");

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleGradeChange = (event) => {
    setGrade(event.target.value);
  };

  const handleClassNameChange = (event) => {
    setClassName(event.target.value);
  };

  const handleClassNoChange = (event) => {
    setClassNo(event.target.value);
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSignin();
    }
  };

  const handleSignin = async () => {
    const URL = `${API_URL}/api/account/signup.do`;

    if (
      id === "" ||
      password === "" ||
      name === "" ||
      grade === "" ||
      className === "" ||
      classNo === ""
    ) {
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
      userType: "S",
      grade: grade,
      className: className,
      classNo: classNo,
    };
    try {
      // 회원가입 성공
      const response = await axios.post(URL, data); // 회원가입 API
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
            <div className={Style.Ang_Text}>학생 회원가입</div>
            <div className={Style.inputs}>
              <input
                className={Style.input}
                type="text"
                id="input-id"
                placeholder="Id"
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
              <select className={Style.select} id="input-grade" onChange={handleGradeChange}>
                <option value="0">학년</option>
                <option value="1">1학년</option>
                <option value="2">2학년</option>
                <option value="3">3학년</option>
              </select>
              <select className={Style.select} id="input-class" onChange={handleClassNameChange}>
                <option value="0">반</option>
                <option value="1">1반</option>
                <option value="2">2반</option>
                <option value="3">3반</option>
                <option value="4">4반</option>
              </select>
              <select className={Style.select} id="input-classNo" onChange={handleClassNoChange}>
                <option value="0">번호</option>
                <option value="1">1번</option>
                <option value="2">2번</option>
                <option value="3">3번</option>
                <option value="4">4번</option>
                <option value="5">5번</option>
                <option value="6">6번</option>
                <option value="7">7번</option>
                <option value="8">8번</option>
                <option value="9">9번</option>
                <option value="10">10번</option>
                <option value="11">11번</option>
                <option value="12">12번</option>
                <option value="13">13번</option>
                <option value="14">14번</option>
                <option value="15">15번</option>
                <option value="16">16번</option>
                <option value="17">17번</option>
                <option value="18">18번</option>
                <option value="19">19번</option>
                <option value="20">20번</option>
              </select>
            </div>
            <button className={Style.button} type="button" onClick={handleSignin}>
              회원가입
            </button>
            <div
              onClick={() => {
                navigate("/signup");
              }}
              style={{ cursor: "pointer" }}
            >
              선생님이신가요?
            </div>
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

export default StudentSignUp;
