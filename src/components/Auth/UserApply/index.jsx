import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Toast from "../../../lib/Alert/Toast";
import { CheckLogin } from "../../../hooks/CheckLogin";

import Style from "../../../style/UserApply.module.css";
import UserList from "../../../hooks/UserList";

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

    return (
        <div>
            <div className={Style.Nav_Legend}>
                <h1>승인대기 목록</h1>
                <div className={Style.grade_text} id="grade_1">
                    <hr className={Style.hr} />
                    <div className={Style.users}>
                        {Users.map((user, index) => (
                            <div
                                className={Style.user}
                                key={index}
                                onClick={handleUserClick}
                                id={user.user.id}
                            >
                                <span className={Style.username}>
                                    {user.user.grade}학년 {user.user.className}반{" "}
                                    {user.user.classNo}번 {user.user.name}
                                </span>
                                <span className={Style.N_Btn}>❌</span>
                                <span className={Style.Y_Btn}>✅</span>
                                
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
