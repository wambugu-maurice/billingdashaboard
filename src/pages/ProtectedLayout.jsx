import { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loader from "../components/Loader";
import { Navigate, Outlet } from "react-router";


function ProtectedLayout() {
    const[isAuthenticated,setIsAuthenticated]=useState(false);
    const[isLoading,setIsLoading]=useState(true);

    const auth = getAuth()
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,(user)=>{
            setIsLoading(false);
            setIsAuthenticated(!!user);
        })
        return ()=> unSubscribe()
    },[auth])

    if(isLoading) return <Loader />;
    if(!isAuthenticated) return <Navigate to='login' replace={true} />
  return (
    <Outlet />
  )
}

export default ProtectedLayout