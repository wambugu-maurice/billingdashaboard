import { collection, doc, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../firebase";
import Loader from "./Loader";
import AddCoverLimit from "./AddCoverLimit";
import DeleteUser from "./DeleteUser";


function ManageUsers() {
    const[allUsers,setAllUsers]=useState([]);
    const[error,setError]=useState("");
    const[loading,setIsLoading]=useState(false);

    useEffect(()=>{
        const getUsers = async ()=> {
            try {
                setIsLoading(true)
                setError("")
                
                const fetchUsers = query(collection(db,'users'))
                const fetchedUsers = await getDocs(fetchUsers);

                setAllUsers(
                    fetchedUsers.docs.map((userDoc)=>({
                        id: userDoc.id,
                        ...userDoc.data()
                    }))
                )
    
            } catch (err) {
                setError(err.code)
                console.log(err)
                
            }finally{
                setIsLoading(false)
            }
        }
        getUsers()
},[])
  return (
    <div className="ManageUsers">
        {loading && <Loader />}
        {error && <p className="errMsg">{error}</p>}
        {
            <ol >
                {
                    allUsers?.map((user)=>(
                        <li  key={user.id}>
                            <p>Name: {user.name}</p>
                            <p>Email: {user.email}</p>
                            <p>Role: {user.role}</p>
                            <p>Insured:{user.insuranceAmount ?   <p> ksh {user.insuranceAmount.toLocaleString()}</p> : <p>Uninsured</p>}</p>
                            <div className="buttons">
                                <p><AddCoverLimit /></p>
                                <p><DeleteUser id={user.id}/></p>
                            </div>
                            </li>
                    ))
                }
            </ol>
        }
    </div>
  )
}

export default ManageUsers