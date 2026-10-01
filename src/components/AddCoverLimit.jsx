import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getDocs, query, where } from "firebase/firestore";
import toast from 'react-hot-toast';
import UpdateClaims from './UpdateClaims';


function AddCoverLimit() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const[insuranceAmount,setInsuranceAmout]=useState("")
    const[search,setSearchValue]=useState("")
    const[users,setUsers]=useState([])
    const[selectedUser,setSelectedUser]=useState(null)
   
    const searchSelection = useRef(false)
    useEffect(()=>{
      if(searchSelection.current){
        searchSelection.current = false;
        return
      }
      const timer = setTimeout(async ()=>{
        if(!search.trim()){
          setUsers([]);
          return;
        }
        const q = query(
        collection(db,"users"),
      where("name",">=",search),
      where("name","<=",search + "\uf8ff")
    )

      const snapshot = await getDocs(q)

      setUsers(
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      )
      },[400])

      return ()=> clearTimeout(timer)
    },[search])

    function handleClick(user){
      searchSelection.current = true;
       setSearchValue(user.name);
       setSelectedUser(user)
      setUsers([])
      
    }

   const handleSave = async () => {
  if (!selectedUser) {
    alert("Please select a client");
    return;
  }

  if (!insuranceAmount) {
    alert("Please enter an insured amount");
    return;
  }

  const userRef = doc(db, "users", selectedUser.id);

  await updateDoc(userRef, {
    insuranceAmount: Number(insuranceAmount)
  });
  

  toast.success("Added succesfully!!")

  handleClose();
};
    

  return (
    <>
      <Button variant="primary" onClick={handleShow} className='addButton'>
        Add card Limit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add cover amount</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Client's Name</Form.Label>
                    <Form.Control type="text" placeholder="john doe" value={search} onChange={(e)=>setSearchValue(e.target.value)} />
            </Form.Group>
                {users.map(user => (
                  <div key={user.id} onClick={()=> handleClick(user)}>
                    {user.name}
                  </div>
                  
                ))}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Add cover amount</Form.Label>
                    <Form.Control type="number" placeholder="kes 1,000" value={insuranceAmount} 
                    onChange={(event)=>setInsuranceAmout(event.target.value)}/>
            </Form.Group>
      </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
      
    </>
  );
}

export default AddCoverLimit