import { BrowserRouter, Route, Routes } from "react-router"
import ProtectedLayout from "./pages/ProtectedLayout"
import Layout from "./pages/Layout"
import Dashboard from "./pages/Dashboard"
import Preauths from "./pages/Preauths"
import Reports from "./pages/Reports"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Reset from "./pages/Reset"
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <main>
        <BrowserRouter>
            <Routes>
                <Route element={<ProtectedLayout />}>
                  <Route path="" element={<Layout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="preauths" element={<Preauths />} />
                    <Route path="reports" element={<Reports />} />
                  </Route>
                </Route>

                <Route path="signup" element={<Signup />}/>
                <Route path='login' element={<Login />}/>
                <Route path="reset" element={<Reset />}/>
              
            </Routes>
        </BrowserRouter>
    </main>
  )
}

export default App