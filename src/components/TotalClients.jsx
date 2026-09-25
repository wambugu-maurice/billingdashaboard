import { collection, getCountFromServer, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";


function TotalClients() {
    const[noOfUsers,setNoOfUsers]=useState(0)

  useEffect(()=>{
    const queryFunction = async ()=>{
      const allClients = query(collection(db,"users"))
      const snapshot = await getCountFromServer(allClients);
      setNoOfUsers(snapshot.data().count)
    }
    queryFunction()
  },[])
  return (
    <div className="card">
          <h2>Total clients</h2>
          {
            noOfUsers
          }

        </div>
  )
}

export default TotalClients