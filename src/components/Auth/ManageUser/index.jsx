import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

import Style from "../../../style/ManageUser_style.module.css";
import { CheckLogin } from "../../../hooks/CheckLogin";
import UserList from "../../../hooks/UserList";
import { useNavigate } from "react-router-dom";
import Toast from "../../../lib/Alert/Toast";
import swalWithBootstrapButtons from "../../../lib/Alert/Confirm";

export const URL = process.env.REACT_APP_API;

const ManageUser = () => {
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
              if (item.user.approvedYn === "Y") {
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

  const DeleteUser = async (UserId) => {
    const accessToken = localStorage.getItem("accessToken");
    const DeleteURL = `${URL}/api/teacher/delete/user?id=${UserId}`;
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
          data.push(item);
        });
        setUsers(data);
      });
      swalWithBootstrapButtons
        .fire("삭제완료", "계정이 성공적으로 삭제되었습니다", "success")
        .catch((error) => {
          Toast.fire({
            icon: "error",
            title: "유저 삭제 실패",
          });
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserClick = async (e) => {
    const UserId = await e.target.id;
    // console.log(UserId);
    console.log(UserId + "click!");
  };

  const handleNClick = async (e) => {
    const UserId = await e.target.id;
    console.log(UserId + "Nclick!");

    swalWithBootstrapButtons
      .fire({
        title: "유저를 정말 삭제하시겠습니까?",
        text: "유저를 삭제하면 복구할 수 없습니다!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "확인",
        cancelButtonText: "취소",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          DeleteUser(UserId);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Toast.fire({
            icon: "error",
            title: "유저삭제 취소",
          });
        }
      });
  };

  const handleMealreq = async () => {
    const { value: file } = await Swal.fire({
      title: "파일을 선택하세요",
      input: "file",
      inputAttributes: {
        accept: "xlsx/*",
        "aria-label": "Upload your excel file",
      },
    });

    if (file) {
      UploadForm(file);
      Swal.fire({
        icon: "success",
        title: "파일이 업로드 되었습니다",
      });
    }
  };

  const UploadForm = async (file) => {
    const accessToken = localStorage.getItem("accessToken");
    const UploadURL = `${URL}/api/teacher/form/upload/meal`;

    const formData = new FormData();
    formData.append("bundle", file);
    const response = await axios.post(UploadURL, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data", // 필수: FormData를 사용할 때 필요한 헤더 설정
      },
    });

    return response.data;
  };

  const DownloadForm = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const DownloadURL = `${URL}/api/teacher/form/download/meal`;
    axios({
      method: "get",
      url: DownloadURL,
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => {
      const blob = new Blob([response.data]);

      const fileUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = fileUrl;
      link.style.display = "none";

      const injectFilename = (res) => {
        const disposition = res.headers["content-disposition"];

        if (disposition) {
          const fileName = decodeURI(
            disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1].replace(/['"]/g, "")
          );
          return fileName;
        } else {
          return "신청 양식.xlsx";
        }
      };

      link.download = injectFilename(response);

      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  };

  const handleMealForm = async () => {
    swalWithBootstrapButtons
      .fire({
        title: "양식을 다운받으시겠습니까?",
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "취소",
        confirmButtonText: "확인",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          DownloadForm();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Toast.fire({
            icon: "error",
            title: "유저삭제 취소",
          });
        }
      });
  };
  return (
    <div>
      <div className={Style.Nav_Legend}>
        <div>
          <h1>유저 목록</h1> <button onClick={handleMealForm} className={Style.FormButton}>일괄 급식 신청 양식</button>{" "}
          <button onClick={handleMealreq} className={Style.FormButton}>일괄 급식 신청</button>
        </div>

        <div className={Style.grade_text} id="grade_1">
          <hr className={Style.hr} />
          <div className={Style.users}>
            {Users.map((user, index) => (
              <div className={Style.user} key={index} onClick={handleUserClick} id={user.user.id}>
                <span className={Style.username}>
                  {user.user.grade}학년 {user.user.className}반 {user.user.classNo}번{" "}
                  {user.user.name}
                </span>
                {/* <span
                                    className={Style.N_Btn}
                                    id={user.user.id}
                                    onClick={handleNClick}
                                > */}
                <button className={Style.N_Btn} id={user.user.id} onClick={handleNClick}>
                  유저 삭제하기
                </button>
                {/* <div className={Style.meal_status}>{ user }</div> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
