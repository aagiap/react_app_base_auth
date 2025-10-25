import Header from "../components/common/Header"
import { Outlet } from "react-router-dom"
import ErrorBoundary from "../components/common/ErrorBoundary"

const MainLayout = () => {
    return (
        <ErrorBoundary>
            <Header />
            <main>
                <Outlet />
            </main>
        </ErrorBoundary>
    )
}

export default MainLayout
