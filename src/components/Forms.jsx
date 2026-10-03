import {   doc, updateDoc, collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const steps = ["Personal Information","Claim Information","Review Information"]
function Forms({selectedUser}) {
    const[step,setStep]=useState(0);
    const[formData,setFormData]=useState({
      DrName:"",
      DateClaimed:"",
      ClaimAmount:""
    });
    const[error,setError]=useState("")
    const[loading,setloading]=useState(false)
    const[status,setStatus]=useState("Pending")

    
const navigate = useNavigate()
    function updateField(event){
      const{name,value}= event.target;
      setFormData((formInfo)=>({
        ...formInfo,[name]: value
      }));
      setError("")
    }

    function nextStep(){
      if(step === 1 &&(!formData.DrName.trim() || !formData.DateClaimed || !formData.ClaimAmount.trim())){
        setError("Please find all fields");
        return
      }
      setError("");
      setStep((currentStep)=> currentStep + 1)
    }

    function previousStep(){
      setError("");
      setStep((currentStep)=> currentStep - 1);
    }

  const handleSubmit = async (event) => {
  event.preventDefault();
  setloading(true)
  const newInsuranceAmount =
    selectedUser.insuranceAmount - Number(formData.ClaimAmount);

  await updateDoc(
    doc(db, "users", selectedUser.id),
    {
      insuranceAmount: newInsuranceAmount,
       hasClaims: true
    }
  );

  await addDoc(collection(db, "claims"), {
  userId: selectedUser.id,
  name: selectedUser.name,
  email: selectedUser.email,
  claimedAmount: Number(formData.ClaimAmount),
  doctorName: formData.DrName,
  dateOfClaim: formData.DateClaimed,
  status

});


  toast.success("Form submitted!");
  setloading(false)
  

  navigate('/preauths');

};

  return (
    <div className="formsDiv">
      <div>
        <h1>Preauthorization for: {selectedUser.name}</h1>
      </div>
      <form onSubmit={handleSubmit} className="card">
        <p>
          step {step + 1} of  {steps.length} : {steps[step]}
        </p>
        {
          error && <p className="errMsg">{error}</p>
        }
        {
          step === 0 && <>
          <div >
              <p>Client name: {selectedUser.name}</p>
              <p>Client email: {selectedUser.email}</p>
              <p>Insured amount: ksh {selectedUser.insuranceAmount}</p>
              </div>
          </>
        }
        {
          step === 1 && <>
          <div >
            <label htmlFor="drName">
              Dr Name
              <input type="text" id="drName" name="DrName" value={formData.DrName} onChange={updateField} />
            </label>

            <label htmlFor="claim">
              Claim Amount
              <input type="number" name="ClaimAmount" id="claim" value={formData.ClaimAmount} onChange={updateField} />
            </label>

            <label htmlFor="dateField">
              Date
              <input type="date" name="DateClaimed" id="dateField"  value={formData.DateClaimed} onChange={updateField}/>
            </label>
          </div></>
        }
        {
          step === 2 && <>
          <div >
            <h2>Review Information</h2>
            <div>
              <p>Name {selectedUser.name}</p>
              <p>Date claimed {formData.DateClaimed}</p>
              <p>Doctor name {formData.DrName}</p>
              <p>Claim amount {formData.ClaimAmount}</p>
            </div>
          </div>
          </>
        }
          <div className="buttons">
            {
              step > 0 && 
            <button type="button" onClick={previousStep}>Back</button>
        }
        {
          step < steps.length  - 1 ?
            <button key="next" type="button" onClick={nextStep}>Next</button>
          :
            <button key="submit" disabled={loading} type="submit">{loading ? "Submitting":"Submit"}</button>
            }
          </div>
      
      </form>
    </div>
  )
}

export default Forms