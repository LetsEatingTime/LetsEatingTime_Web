import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import Loading from "../components/Loading";

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
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};

export default Router;
