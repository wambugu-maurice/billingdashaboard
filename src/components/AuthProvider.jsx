import { onAuthStateChanged } from "firebase/auth";
import {  createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";



export const AuthContext = createContext()

function AuthProvider({children}) {
    const[user,setUser]=useState(null);
    const[isLoading,setIsLoading]=useState(true);

    useEffect(()=>{
        const unsuscribe = onAuthStateChanged(auth,async(loggedInUser)=>{
            if(loggedInUser){
                const userDoc = await getDoc(
                    doc(db,"users",loggedInUser.uid)
                )
                if(userDoc.exists()){
                    setUser({
                        uid: loggedInUser.uid,
                        ...userDoc.data()
                    })
                }}
            else{
                setUser(null)
            }
            setIsLoading(false)
        })

        return ()=> unsuscribe()
    },[])
  return (
    <AuthContext.Provider value={{user,isLoading}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;