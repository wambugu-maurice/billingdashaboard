import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

function Search() {
    const[searchValue,setSearchvalue]=useState("");
    const[users,setUsers]=useState([])
    const[loading,setIsloading]=useState(false)

    const navigate = useNavigate()

    useEffect(()=>{

        if (!searchValue.trim()) {
            setUsers([]);
            return;
        }
        const timer = setTimeout(async ()=>{
            setIsloading(true)
            const searchQuery = query(collection(db,"users"),
                                        where("name",">=",searchValue),
                                        where("name","<=",searchValue + "\uf8ff"));
            const searchedUser = await getDocs(searchQuery);

            setUsers(
                searchedUser.docs.map((doc)=>({
                    id:doc.id,
                    ...doc.data()
                }))
            )
            setIsloading(false)
        },400)
        return ()=> clearTimeout(timer)
    },[searchValue])

    function handleSelecttedUser(user){
        navigate(`/preauths/${user.id}`)
    }
  return (
    <div className="searchDiv">
        <div className="searchBox">
            <input type="text" placeholder="john doe" value={searchValue} onChange={(event)=>setSearchvalue(event.target.value)} />
        </div>
        <div className="resultsDiv">
            <ul className="userResults">
                {
                    loading ? <Loader /> :
                    
                    users.map((user)=>(
                        <li key={user.id} onClick={()=>handleSelecttedUser(user)}>
                            <p>Name: {user.name}</p>
                            <p>Email: {user.email}</p>
                            <p>Insurance status: {user.insuranceAmount > 0 ? "Insured":"Not insured"}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    </div>
  )
}

export default Search