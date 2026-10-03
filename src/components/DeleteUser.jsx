import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useState } from 'react';
import { db } from '../firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import toast from 'react-hot-toast';

function DeleteUser({id}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleDelete = async ()=>{
    try {
        setError("")
        setIsLoading(true);

        const deleteRef = doc(db,"users",id);
        await deleteDoc(deleteRef)
        toast.success("User deleted")
        onClose()  
    } catch (err) {
        setError(err.code)   
    }finally{
        setIsLoading(false)
    }
  }

  return (
    <>
    {
        error && <p className='errMsg'>{error}</p>
    }
      <Button colorScheme='red' onClick={onOpen}>
        Delete Customer
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={handleDelete} ml={3} disabled={isLoading}>
                {
                    isLoading ? "Deleting...": "Delete"
                }
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default DeleteUser