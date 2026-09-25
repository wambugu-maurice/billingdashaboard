
import AddCoverLimit from "../components/AddCoverLimit"
import Insured from "../components/Insured"
import Search from "../components/Search"
import TotalClients from "../components/TotalClients"



function Dashboard() {
  return (
    <div className="dashboardDiv">
      <div className="activeClients">
            <TotalClients />
            <Insured />
      </div>
      <div className="limitComponent">
        <AddCoverLimit />
        <Search />
      </div>
      
    </div> 
  )
}

export default Dashboard