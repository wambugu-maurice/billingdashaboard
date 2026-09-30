import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { db } from "../firebase";

function PatientReports() {
  const [users, setUsers] = useState([]);
  const [userClaims, setUserClaims] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const usersQuery = query(
        collection(db, "users"),
        where("hasClaims", "==", true)
      );

      const snapshot = await getDocs(usersQuery);

      setUsers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
      );
    };

    getUsers();
  }, []);

  const handleShowClaims = async (user) => {
    setSelectedUser(user);

    const claimsQuery = query(
      collection(db, "claims"),
      where("userId", "==", user.id)
    );

    const snapshot = await getDocs(claimsQuery);

    setUserClaims(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
    );

    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedUser(null);
    setUserClaims([]);
  };

  return (
    <div>
      {users.map((user) => (
        <div key={user.id} className="claimsDiv">
          <div>
            <span>{user.name}</span>
          </div>

          <div>
            <Button onClick={() => handleShowClaims(user)}>
            View Claims
          </Button>
          </div>
        </div>
      ))}

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedUser?.name}'s Claims
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Doctor Name</th>
                <th>Date Claimed</th>
                <th>Claimed Amount</th>
              </tr>
            </thead>

            <tbody>
              {userClaims.map((claim) => (
                <tr key={claim.id}>
                  <td>{claim.doctorName}</td>
                  <td>{claim.dateOfClaim}</td>
                  <td>{claim.claimedAmount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PatientReports;