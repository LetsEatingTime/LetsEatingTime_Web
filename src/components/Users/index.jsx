import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-scroll";

import Style from "../../style/Users_style.module.css";
import Toast from "../../lib/Alert/Toast";
import { CheckLogin } from "../../hooks/CheckLogin";
import UserList from "../../hooks/UserList";

const Flex = styled.div`
  height: 100vh;
`;

const Users = () => {
  const navigate = useNavigate();
  const [data_grade1, setData_grade1] = useState([]);
  const [data_grade2, setData_grade2] = useState([]);
  const [data_grade3, setData_grade3] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    CheckLogin(accessToken).then((isTeacher) => {
      if (isTeacher) {
        console.log("로그인 성공");

        const accessToken = localStorage.getItem("accessToken");

        const grade1 = [];
        const grade2 = [];
        const grade3 = [];

        UserList(accessToken)
          .then((users) => {
            users.forEach((item) => {
              if (item.user.approvedYn === "Y") {
                if (item.user.grade === 1) {
                  grade1.push(item);
                } else if (item.user.grade === 2) {
                  grade2.push(item);
                } else if (item.user.grade === 3) {
                  grade3.push(item);
                }
              }
            });

            setData_grade1(grade1);
            setData_grade2(grade2);
            setData_grade3(grade3);
          })
          .catch((error) => {
            console.error(error);
            navigate("/");
          });
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

  const handleUserClick = async (e) => {
    const UserId = await e.target.id;
    // console.log(UserId);
    navigate("/user", {
      state: { UserId: UserId },
    });
  };

  return (
    <div>
      <div className={Style.Nav_Legend}>
        <Flex>
          <h1>학생목록</h1>
          <Link to="grade_1" spy={true} smooth={true}>
            <button className={Style.btn}>1학년</button>
          </Link>
          <Link to="grade_2" spy={true} smooth={true}>
            <button className={Style.btn}>2학년</button>
          </Link>
          <Link to="grade_3" spy={true} smooth={true}>
            <button className={Style.btn}>3학년</button>
          </Link>
          <div className={Style.grade_text} id="grade_1">
            <h2>1학년</h2>
            <hr className={Style.hr} />
            <div className={Style.users}>
              {data_grade1.map((user, index) => (
                <div className={Style.user} key={index} onClick={handleUserClick} id={user.user.id}>
                  <span className={Style.username}>
                    {user.user.grade}학년 {user.user.className}반 {user.user.classNo}번{" "}
                    {user.user.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className={Style.grade_text} id="grade_2">
            <h2>2학년</h2>
            <hr className={Style.hr} />
            <div className={Style.users}>
              {data_grade2.map((user, index) => (
                <div className={Style.user} key={index} onClick={handleUserClick} id={user.user.id}>
                  <span className={Style.username}>
                    {user.user.grade}학년 {user.user.className}반 {user.user.classNo}번{" "}
                    {user.user.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className={Style.grade_text} id="grade_3">
            <h2>3학년</h2>
            <hr className={Style.hr} />
            <div className={Style.users}>
              {data_grade3.map((user, index) => (
                <div className={Style.user} key={index} onClick={handleUserClick} id={user.user.id}>
                  <span className={Style.username}>
                    {user.user.grade}학년 {user.user.className}반 {user.user.classNo}번{" "}
                    {user.user.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default Users;
