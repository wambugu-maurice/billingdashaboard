import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"


function Layout() {
  return (
    <div className="layout">
        <Sidebar />
        <div className="layoutOutlet">
            <Outlet />
        </div>
    </div>
  )
}

export default Layout