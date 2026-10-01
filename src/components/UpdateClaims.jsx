import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdSystemUpdateAlt } from "react-icons/md";
import { db } from "../firebase";

function UpdateClaims({ claim }) {
    const [show, setShow] = useState(false);
    const [updateAmount, setUpdateAmount] = useState(claim.claimedAmount);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleClose = () => setShow(false);

    const handleShow = () => {
        setUpdateAmount(claim.claimedAmount);
        setShow(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            const newClaimAmount = Number(updateAmount);
            const oldClaimAmount = Number(claim.claimedAmount);

            const userRef = doc(db, "users", claim.userId);
            const userSnapshot = await getDoc(userRef);

            if (!userSnapshot.exists()) {
                throw new Error("User not found");
            }

            const user = userSnapshot.data();

            const difference = newClaimAmount - oldClaimAmount;

            const newInsuranceAmount =
                Number(user.insuranceAmount) - difference;

            await updateDoc(
                doc(db, "claims", claim.id),
                {
                    claimedAmount: newClaimAmount
                }
            );

            await updateDoc(userRef, {
                insuranceAmount: newInsuranceAmount
            });

            handleClose();

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="updatesDiv">
            <Button variant="primary" onClick={handleShow}>
                <MdSystemUpdateAlt /> Update
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Update claim for {claim.name}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {error && <p>{error}</p>}

                    <form onSubmit={handleUpdate}>
                        <Form.Group className="mb-3">
                            <Form.Label>Claim amount</Form.Label>

                            <Form.Control
                                type="number"
                                value={updateAmount}
                                onChange={(e) =>
                                    setUpdateAmount(e.target.value)
                                }
                            />
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Update"}
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default UpdateClaims;