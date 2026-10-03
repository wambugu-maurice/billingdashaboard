import { Link } from "react-router-dom"
import { MdOutlineDashboard, MdOutlinePending } from "react-icons/md";
import { GoGitPullRequest } from "react-icons/go";
import { TbReportSearch } from "react-icons/tb";
import Logout from "./Logout";
import { useContext } from "react";
import  { AuthContext } from "./AuthProvider";
import { FaUsers } from "react-icons/fa";

function Sidebar() {
    const { user } = useContext(AuthContext)
    const links = [
        {
            title:'dashboard',
            path:'dashboard',
            icon: MdOutlineDashboard
        },
        {
            title:'preauths',
            path:'preauths',
            icon: GoGitPullRequest
        },{
            title: 'active',
            path:"activevists",
            icon: MdOutlinePending
        },{
            title:'reports',
            path:'reports',
            icon: TbReportSearch
        },{
            title: 'users',
            path:'users',
            icon: FaUsers,
            adminOnly: true

        }
    ]
    return (
        <div className="links">
            <ul>
                {links.map((link) => {

                    if (link.adminOnly && user?.role !== "admin") {
                        return null;
                    }

                    return (
                        <li key={link.title}>
                            <Link to={link.path} className="navLinks">
                                {link.icon && <link.icon />}
                                {link.title}
                            </Link>
                        </li>
                    );
                })}
            </ul>

            <Logout />
        </div>
    );
}
export default Sidebar