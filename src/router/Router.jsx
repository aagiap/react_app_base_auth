import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
// import * as path from "node:path";
import NoAuth from "../pages/NoAuth";
import MustLogin from "../pages/MustLogin";
import MustAdmin from "../pages/MustAdmin";
import Login from "../pages/auth/Login";
import NotFound from "../pages/errors/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import AuthProvider from "../contexts/AuthProvider";
import Unauthorized from "../pages/errors/Unauthorized";

const router = createBrowserRouter([
    {
      path: "/landing",
      element: <NoAuth/>
    },
    {
        path: "/",
        element: (
            <AuthProvider>
                <MainLayout/>
            </AuthProvider>
        ),
        children: [
            {path: "/", element: <Navigate to="/home"/>},
            {path: "/home", element: <NoAuth/>},
            {
                path: "/author",
                element: (
                    <ProtectedRoute requiredRoles={["ROLE_USER", "ROLE_ADMIN"]}>
                        <MustLogin/>
                    </ProtectedRoute>
                ),
            },
            {
                path: "/admin",
                element: (
                    <ProtectedRoute requiredRoles={["ROLE_ADMIN"]}>
                        <MustAdmin/>
                    </ProtectedRoute>
                ),
            },
            {path: "/login", element: <Login/>},

        ]
    },
    {
        path: "/unauthorized",
        element: <Unauthorized/>
    },
    {
        path: "*",
        element: <NotFound/>
    },
])

const Router = () => {
    return <RouterProvider router={router}/>;
};

export default Router;
