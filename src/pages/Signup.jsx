import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"
import { auth, db } from "../firebase";
import { doc } from "firebase/firestore";
import { setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


function Signup() {
    const[formData,setFormData]=useState({
        name:'',
        email:'',
        password:''
    })
    const[error,setError]=useState("");
    const[isLoading,setIsLoading]=useState(false)

    const navigate = useNavigate()

    async function handleSignUp(event){
        event.preventDefault();
        try {
            setIsLoading(true)
            setError("")

            const {name,email,password}= formData;
            if(!name || !email || !password){
                setError("Please fill all fields");
                return;
            }
            const userCredentials = await createUserWithEmailAndPassword(auth,email,password);
            if(userCredentials.user){
                const newUser = {
                    name,
                    email,
                    createdOn: userCredentials.user.metadata.creationTime,
                    userId: userCredentials.user.uid,
                    role: "staff"
                };
                const docRef = doc(db,"users",userCredentials.user.uid);
                await setDoc(docRef,newUser);
                navigate("/login");
                toast.success("Account created succesfully!")
            }      
        } catch (err) {
            console.error(err.message);
            setError(err.code)
        }finally{
            setIsLoading(false)
        }
    }
  return (
    <section className="signUp">
        {
            error && <p className="errMsg">{error}</p>
        }
        <form onSubmit={handleSignUp}>
            <h2>Signup</h2>
            <label htmlFor="nameInput">Username</label>
            <input type="text"id="nameInput" placeholder="John Doe" value={formData.name} onChange={(event)=>setFormData(user =>({...user,name: event.target.value}))}/>
            <label htmlFor="emailInput">Email</label>
            <input type="email" id="emailInput" placeholder="johndoe@gmail.com" value={formData.email} onChange={(event)=>setFormData(user =>({...user,email: event.target.value}))} />
            <label htmlFor="passwordInput">Password</label>
            <input type="password" id="passwordInput" value={formData.password} onChange={(event)=>setFormData(user =>({...user,password: event.target.value}))} />
             <p>Already have an account?<Link to='/login' >Login</Link></p>
            <button type="submit" disabled={isLoading}>{isLoading ? "creating account...":"Signup"}</button>
        </form>
    </section>
  )
}

export default Signup