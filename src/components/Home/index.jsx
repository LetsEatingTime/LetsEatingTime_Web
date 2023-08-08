import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Toast from "../../lib/Alert/Toast";
// import NavBar from "../NavBar";
import { CheckLogin } from "../../hooks/CheckLogin";
import Piechart from "../Chart/Pie";
import Meal from "../Meal";
import BarChart from "../Chart/Bar";
import Navbar from "../NavBar/NavBar";

const Grid = styled.div`
  width: 80%;
  margin: 50px auto 0;

  display: grid;
  /* display: f; */
  /* flex-direction: column; */
  /* align-items: center; */
  /* justify-content: center; */
  grid-template-columns: 1fr 1fr;
  gap: 80px;
`;

// const Flex = styled.div`
//   display: flex;

//   width: 60%;

//   margin: 50px auto 0;
// `;

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    CheckLogin(accessToken).then((isTeacher) => {
      if (isTeacher) {
        console.log("Auth Success");
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
      <Navbar />
      <div style={{ marginTop: "20px" }}>
        <h1>현재 급식은..</h1>
        <div style={{ margin: "0 auto" }}>
          <Grid>
            <div>
              <BarChart />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                // margin: "0 auto",
                backgroundColor: "white",
                borderRadius: "10px",
                boxShadow: "1px 1px 6px 1px gray",
              }}
            >
              <Piechart />
            </div>
          </Grid>
          <Meal />
        </div>
      </div>
    </div>
  );
};

export default Home;
