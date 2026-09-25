import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";


function Login() {
  const[isLoading,setIsLoading]=useState(false);
  const[formData,setFormData]=useState({
    email:"",
    password:""
  });
  const[error,setError]=useState("")

  const auth = getAuth()
  const navigate = useNavigate()

  async function handlelogin(event) {
    event.preventDefault();
    try {
      setIsLoading(true)
      setError("")

      const{email,password}=formData;
      if(!email || !password){
        setError("Pease fill all fields");
        return;
      }

      await signInWithEmailAndPassword(auth,email,password)
      navigate("/dashboard")
      toast.success("Login succefull")
      
    } catch (err) {
      console.error(err.message)
      setError(err.message)

      
      
    }finally{
      setIsLoading(false)
    }
  }
  return (
    <section className="loginDiv">
      { error && <p className="errMsg">{error}</p>}
      <form onSubmit={handlelogin}>
        <h2>Login</h2>
        <label htmlFor="emailInput">Email</label>
        <input type="email" id="emailInput" value={formData.email} placeholder="johndoes@gmail.com" onChange={(event)=>setFormData(user =>({...user,email: event.target.value}))} />
        <label htmlFor="passInput">Password</label>
        <input type="password" id="passInput" value={formData.password}  onChange={(event)=>setFormData(user =>({...user,password: event.target.value}))} />
        <p>Don't have an account? <Link to='/signup'>Signup</Link></p>
        <button type="submit" disabled={isLoading}>{isLoading ? "Loging in...":"Login"}</button>
      </form>
    </section>
  )
}

export default Login