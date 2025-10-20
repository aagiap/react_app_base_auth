import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import * as path from "node:path";
import NoAuth from "../pages/NoAuth";
import MustLogin from "../pages/MustLogin";
import MustAdmin from "../pages/MustAdmin";
import Login from "../pages/auth/Login";
import NotFound from "../components/errors/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: "/", element: <Navigate to="/landing" /> },
            { path: "/landing", element: <NoAuth/> },
            { path: "/author", element: <MustLogin/> },
            { path: "/admin", element: <MustAdmin/> },
            { path: "/login", element: <Login/> },


            {
                path: "*",
                element: <NotFound/>
            },
        ]
    }
])

const Router = () => {
    return <RouterProvider router={router} />;
};

export default Router;
