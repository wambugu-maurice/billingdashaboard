import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../firebase";

function Search() {
    const[searchValue,setSearchvalue]=useState("");
    const[users,setUsers]=useState([])

    useEffect(()=>{
        if (!searchValue.trim()) {
            setUsers([]);
            return;
        }
        const timer = setTimeout(async ()=>{
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
        },400)
        return ()=> clearTimeout(timer)
    },[searchValue])
  return (
    <div className="searchDiv">
        <div className="searchBox">
            <input type="text" placeholder="john doe" value={searchValue} onChange={(event)=>setSearchvalue(event.target.value)} />
        </div>
        <div className="resultsDiv">
            <ul className="userResults">
                {
                    users.map((user)=>(
                        <li key={user.id}>
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