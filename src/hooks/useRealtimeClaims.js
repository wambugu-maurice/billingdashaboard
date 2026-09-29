import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../firebase";


function useRealtimeClaims() {
    const[claim,setClaim]=useState([]);
    const[loading,setIsLoading]=useState(true);
    const[error,setError]=useState("");

    useEffect(() => {
    const claimsQuery = query(
        collection(db, "claims"));

    const unsubscribe = onSnapshot(
        claimsQuery,
        (snapshot) => {

            const claimsAdded = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
                       

            setClaim(claimsAdded);
            setIsLoading(false);
        },
        (error) => {
            console.log(error);
            setError("Error in fetching claims");
            setIsLoading(false);
        }
    );

    return () => unsubscribe();
}, []);

return { claim, loading, error };
}

export default useRealtimeClaims