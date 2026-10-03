import {  doc, getDoc, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import Loader from "./Loader";
import Forms from "./Forms";

function Preauth() {
  const { userId } = useParams();
  const[user,setUser]=useState(null);
  const[loading,setloading]=useState(true)


  useEffect(()=>{
    async function getUser() {
      setloading(true);
      try{
        const userRef = doc(db,"users",userId)
        const userDoc = await getDoc(userRef);
        setUser(userDoc.exists() ? {id: userDoc.id, ...userDoc.data()} : null)
        
      
    }finally{
      setloading(false)
    }}
      getUser()
  },[userId])
  if(loading) return <Loader />
  if(!user) return <p>User not found</p>

  return <Forms selectedUser={user} />
}

export default Preauth