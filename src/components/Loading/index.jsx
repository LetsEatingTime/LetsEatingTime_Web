import React from "react";
import { HashLoader } from "react-spinners";

const override = {
  display: "flex",
  margin: "0 auto",
  marginTop: "20%",
  textAlign: "center",
};

const Loading = ({ loading }) => {
  return (
    <div>
      <HashLoader
        color="#1c55ff"
        loading={loading}
        cssOverride={override}
        size={150}
        speedMultiplier={2}
      />
    </div>
  );
};

export default Loading;
