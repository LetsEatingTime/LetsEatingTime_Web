import React from "react";
import { PacmanLoader } from "react-spinners";

const override = {
  display: "flex",
  margin: "0 auto",
  marginTop: "20%",
  textAlign: "center",
};

const Loading = ({ loading }) => {
  return (
    <div>
      <PacmanLoader
        color="#1c55ff"
        loading={loading}
        cssOverride={override}
        size={50}
        speedMultiplier={2}
      />
    </div>
  );
};

export default Loading;
