import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import Loading from "../components/Loading";
import UserDetail from "../components/UserDetail";
import UserApply from "../components/Auth/UserApply";
import NavBar from "../components/NavBar";

const Login = lazy(() => import("../components/Auth/Login"));
const SignUp = lazy(() => import("../components/Auth/SignUp"));
const Home = lazy(() => import("../components/Home"));
const NotFound = lazy(() => import("../components/NotFound"));
const Users = lazy(() => import("../components/Users"));

const Router = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/users" element={<Users />} />
                <Route path="/user" element={<UserDetail />} />
                <Route path="/admin" element={<UserApply />} />
                <Route path="/test" element={<NavBar />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};

export default Router;
