import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import ProtectedLayout from "./pages/ProtectedLayout"
import Layout from "./pages/Layout"
import Dashboard from "./pages/Dashboard"
import Preauths from "./pages/Preauths"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Reset from "./pages/Reset"
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Preauth from "./components/Preauth"
import PatientReports from "./components/PatientReports"
import ManageUsers from "./components/ManageUsers"
import Activevists from "./pages/ActiveVists"




function App() {
  return (
    <>
    <main>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route element={<ProtectedLayout />}>
                  <Route path="" element={<Layout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="preauths" element={<Preauths />} />
                    <Route path='activevists' element={<Activevists />}/>
                    <Route path="preauths/:userId" element={<Preauth />} />
                    <Route path="reports" element={<PatientReports />} />
                    <Route path='users' element={<ManageUsers />} />
                  </Route>
                </Route>

                <Route path="signup" element={<Signup />}/>
                <Route path='login' element={<Login />}/>
                <Route path="reset" element={<Reset />}/>
              
            </Routes>
        </BrowserRouter>
    </main>

    </>
  )
}

export default App