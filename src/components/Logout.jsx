import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';


function Logout() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate()

  const auth = getAuth();
  async function handleLogout() {
    await signOut(auth)
    navigate("login")
  toast.success("Logout successfull!")
    
  }


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Logout
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you usre you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Logout;