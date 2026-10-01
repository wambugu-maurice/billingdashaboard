import useRealtimeClaims from "../hooks/useRealtimeClaims"
import Table from 'react-bootstrap/Table';
import Loader from "./Loader";
import UpdateClaims from "./UpdateClaims";




function InsuranceTable() {
    const {claim,loading,error} = useRealtimeClaims()
  return (
    <div className="tableDiv">
      { loading && <Loader />}
      {error && <p>{error}</p>}
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>Dr Name</th>
          <th>Patient Name</th>
          <th>Email</th>
          <th>Date claimed</th>
          <th>Amount</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
            
            claim?.map((c)=>(
                <tr key={c.id} >
                  <td>{c.doctorName}</td>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    <td>{new Date(c.dateClaimed).toLocaleDateString()}</td>
                    <td>{c.claimedAmount}</td>
                    <td><UpdateClaims claim={c}/></td>
                </tr>
            ))
        }
      </tbody>
    </Table>
    </div>
  )
}

export default InsuranceTable