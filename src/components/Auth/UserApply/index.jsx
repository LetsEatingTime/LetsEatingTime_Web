import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Style from "../../../style/UserApply.module.css";
import Toast from "../../../lib/Alert/Toast";
import { CheckLogin } from "../../../hooks/CheckLogin";
import UserList from "../../../hooks/UserList";
import axios from "axios";

export const URL = process.env.REACT_APP_API;

const UserApply = () => {
  const navigate = useNavigate();
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    CheckLogin(accessToken).then((isTeacher) => {
      if (isTeacher) {
        console.log("로그인 성공");

        UserList(accessToken)
          .then((users) => {
            // console.log(users)
            const data = [];
            users.forEach((item) => {
              if (item.user.approvedYn === "N") {
                data.push(item);
              }
            });
            setUsers(data);
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
    console.log(UserId + "click!");
  };

  const handleYClick = async (e) => {
    const UserId = await e.target.id;
    // console.log(UserId);
    console.log(UserId + "Yclick!");
    const accessToken = localStorage.getItem("accessToken");

    const ApproveURL = `${URL}/api/teacher/approve?id=${UserId}`;
    try {
      await axios.post(
        ApproveURL,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      await UserList(accessToken).then((users) => {
        // console.log(users)
        const data = [];
        users.forEach((item) => {
          if (item.user.approvedYn === "N") {
            data.push(item);
          }
        });
        setUsers(data);
      });
      Toast.fire({
        icon: "success",
        title: "회원승인 성공",
      }).catch((error) => {
        Toast.fire({
          icon: "error",
          title: "회원승인 실패",
        });
        console.error(error);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleNClick = async (e) => {
    const UserId = await e.target.id;
    // console.log(UserId);
    console.log(UserId + "Nclick!");
    const accessToken = localStorage.getItem("accessToken");
    const DeleteURL = `${URL}/api/teacher/delete-user?id=${UserId}`;
    try {
      await axios.delete(DeleteURL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      await UserList(accessToken).then((users) => {
        // console.log(users)
        const data = [];
        users.forEach((item) => {
          if (item.user.approvedYn === "N") {
            data.push(item);
          }
        });
        setUsers(data);
      });
      Toast.fire({
        icon: "success",
        title: "유저승인 거절 성공",
      }).catch((error) => {
        Toast.fire({
          icon: "error",
          title: "유저승인 거절 실패",
        });
        console.error(error);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className={Style.Nav_Legend}>
        <h1>승인대기 목록</h1>
        <div className={Style.grade_text} id="grade_1">
          <hr className={Style.hr} />
          <div className={Style.users}>
            {Users.map((user, index) => (
              <div className={Style.user} key={index} onClick={handleUserClick} id={user.user.id}>
                <span className={Style.username}>
                  {user.user.grade}학년 {user.user.className}반 {user.user.classNo}번{" "}
                  {user.user.name}
                </span>
                <span className={Style.N_Btn} id={user.user.id} onClick={handleNClick}>
                  ❌
                </span>
                <span className={Style.Y_Btn} id={user.user.id} onClick={handleYClick}>
                  ✅
                </span>

                {/* <div className={Style.meal_status}>{ user }</div> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserApply;
