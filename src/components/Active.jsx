import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../firebase";
import { Button, Table } from "react-bootstrap";
import Loader from "./Loader";


function Active() {
  const[activeVists,setActiveVists]=useState([]);
  const[isLoading,setIsLoading]=useState(false)
  const[error,setError]=useState("");
  const[status,setStatus]=useState("Pending")

  useEffect(()=>{
    const fetchActiveClaims = async ()=>{
      try {
        setError("")
        setIsLoading(true)
          const activeRef = query(collection(db,"claims"),
                              where("status","==","Pending"));
          const fetchedActiveClaims = await getDocs(activeRef);

            setActiveVists(
            fetchedActiveClaims.docs.map((active)=>({
              id: active.id,
              ...active.data()
            }))
          )
          
        
      } catch (err) {
        setError(err.code)
        
      }finally{
        setIsLoading(false)
      }
    }
    fetchActiveClaims()
  },[])

  const handleStatusChange = (id,newStatus)=>{
    setActiveVists((claims)=>
    claims.map((claim)=>(
      claim.id == id ? {...claim, status: newStatus} : claim
    )))
  }

  const updateClaim = async (claimId,status)=> {
    try {
      await updateDoc(doc(db,"claims",claimId),{status: status})
      setActiveVists((claims) => claims.filter((claim) => claim.id !== claimId) );
      
    } catch (err) {
      setError(err.code)
      
    }

  }
  return (
    <div className="activeDiv">
      {
        isLoading && <Loader />
      }
      {
        error && <p className="errMsg">{error}</p>
      }
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>Dr Name</th>
          <th>Patient Name</th>
          <th>Email</th>
          <th>Date claimed</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
            
            activeVists?.map((active)=>(
                <tr key={active.id} >
                  <td>{active.doctorName}</td>
                    <td>{active.name}</td>
                    <td>{active.email}</td>
                    <td>{new Date(active.dateOfClaim).toLocaleDateString()}</td>
                    <td>{active.claimedAmount}</td>
                    <td>{active.status}</td>
                    <td>
                      <select value={active.status} onChange={(event)=>handleStatusChange(active.id ,event.target.value)}>
                        <option value="Pending">Pending</option>
                        <option value="Rejected">Rejected</option>
                        <option  value="Approved">Approved</option>
                        <option  value="UnderReview">Under Review</option>
                      </select>
                      <Button onClick={()=>updateClaim(active.id , active.status)}>
                          Update Status
                        </Button>
                    </td>
                </tr>
            ))
        }
      </tbody>
    </Table>
    </div>
  )
}

export default Active