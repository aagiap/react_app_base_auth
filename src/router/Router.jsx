import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import AuthProvider from "../contexts/AuthProvider"
import MainLayout from "../layout/MainLayout"
import Home from "../pages/Home"
import MustLogin from "../pages/MustLogin"
import MustAdmin from "../pages/MustAdmin"
import Login from "../pages/auth/Login"
import NotFound from "../pages/errors/NotFound"
import ProtectedRoute from "./ProtectedRoute"
import Unauthorized from "../pages/errors/Unauthorized"
import UnAuthenticated from "../pages/errors/UnAuthenticated";

import {ROUTES} from "../config/Constant";
const RootLayout = () => {
    return (
        <AuthProvider>
            <MainLayout />
        </AuthProvider>
    )
}

const router = createBrowserRouter([

    {
        path: "/",
        element: <RootLayout />,
        children: [
            { path: "/", element: <Navigate to="/home" /> },
            { path: "/home", element: <Home /> },
            {
                path: "/author",
                element: (
                    <ProtectedRoute requiredRoles={["ROLE_USER", "ROLE_ADMIN"]}>
                        <MustLogin />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/admin",
                element: (
                    <ProtectedRoute requiredRoles={["ROLE_ADMIN"]}>
                        <MustAdmin />
                    </ProtectedRoute>
                ),
            },
            { path: "/login", element: <Login /> },
        ],
    },
    {
        path: ROUTES.UNAUTHORIZED,
        element: <Unauthorized />,
    },
    {
        path: ROUTES.UNAUTHENTICATED,
        element: <UnAuthenticated />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
])

const Router = () => {
    return <RouterProvider router={router} />
}

export default Router
