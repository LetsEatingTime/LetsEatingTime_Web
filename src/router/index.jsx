import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loading from "../components/Loading";
import UserDetail from "../components/UserDetail";
import UserApply from "../components/Auth/UserApply";
import ManageUser from "../components/Auth/ManageUser";

const Login = lazy(() => import("../components/Auth/Login"));
const SignUp = lazy(() => import("../components/Auth/SignUp"));
const Home = lazy(() => import("../components/Home"));
const NotFound = lazy(() => import("../components/NotFound"));
const Users = lazy(() => import("../components/Users"));
const PrivacyPolicy = lazy(() => import("../components/PrivacyPolicy"));

const Router = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user" element={<UserDetail />} />
        <Route path="/admin/apply" element={<UserApply />} />
        <Route path="/admin/users" element={<ManageUser />} />

        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
