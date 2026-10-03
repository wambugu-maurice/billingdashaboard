import { useContext } from "react"
import { AuthContext } from "./AuthProvider"

function Currentuser() {
        const { user } = useContext(AuthContext)
    
  return (
    <div className="currentuser"> <p>hello {user.name}</p>  
    <small>{user.role}</small></div>
  )
}

export default Currentuser