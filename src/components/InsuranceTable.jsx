import useRealtimeClaims from "../hooks/useRealtimeClaims"
import Table from 'react-bootstrap/Table';



function InsuranceTable() {
    const {claim,loading,error} = useRealtimeClaims()
  return (
    <div className="tableDiv">
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>Dr Name</th>
          <th>Patient Name</th>
          <th>Email</th>
          <th>Date claimed</th>
          <th>Amount</th>
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
                </tr>
            ))
        }
      </tbody>
    </Table>
    </div>
  )
}

export default InsuranceTable