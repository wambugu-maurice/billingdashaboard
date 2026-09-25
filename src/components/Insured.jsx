import { collection, getCountFromServer, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";


function Insured() {
  const[insured,setInsured]=useState(0)
  useEffect(()=>{
    const queryFunction = async ()=>{
      const insuredClients = query(collection(db,"users"),
                                      where("insuranceAmount",">",0));
      const snapshot = await getCountFromServer(insuredClients)
      setInsured(snapshot.data().count)
    }
    queryFunction()
  },[])
  return (
    <div className="card">
          <h2>Insured clients</h2>
          {
            insured
          }
        </div>
  )
}

export default Insured