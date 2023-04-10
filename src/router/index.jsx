import { Route, Routes } from "react-router-dom";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";

const Router = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<HomePage />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default Router;