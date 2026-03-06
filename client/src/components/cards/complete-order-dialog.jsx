import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast
} from '@chakra-ui/react'
import { changeState } from '../../api/cart'
import { useNavigate } from 'react-router-dom'

export const CompleteOrderDialog = ({ isOpen, onClose, cancelRef, cart }) => {
  const toast = useToast()

  const navigate = useNavigate()
  const handleCancelCart = async () => {
    const data = { id: cart.id, newState: 'COMPLETED' }
    try {
      const res = await changeState(data)
      console.log(res)
      toast({
        title: 'Order Completed succesfully',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      navigate('.', { replace: true })
    } catch (error) {
      toast({
        title: 'Error Compliting order',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    } finally {
      onClose()
    }
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            COMPLETE Order
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure yo wanna COMPLETE this order? You can&apos;t undo this
            action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme='green' onClick={handleCancelCart} ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
