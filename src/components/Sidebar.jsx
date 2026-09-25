import { Link } from "react-router"
import { MdOutlineDashboard } from "react-icons/md";
import { GoGitPullRequest } from "react-icons/go";
import { TbReportSearch } from "react-icons/tb";
import Logout from "./Logout";

function Sidebar() {
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
            title:'reports',
            path:'reports',
            icon: TbReportSearch
        }
    ]
  return (
    <div className="links">
        <ul>
            {
                links.map((link)=>(
                    <li key={link.title}>
                        <Link to={link.path}>
                        <link.icon />
                        {link.title}
                        </Link>
                    </li>
                ))
            }
        </ul>
        <Logout />
    </div>
  )
}

export default Sidebar