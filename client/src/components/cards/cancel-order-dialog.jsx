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
import { cancel, changeState } from '../../api/cart'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../store/auth'

export const CancelOrderDialog = ({ isOpen, onClose, cancelRef, cart }) => {
  const toast = useToast()
  const navigate = useNavigate()

  const { user } = useAuth()

  const handleCancelCart = async () => {
    const data = { id: cart.id, newState: 'CANCELED' }
    try {
      if (user.role === 'ADMIN') {
        await changeState(data)
      } else if (user.role === 'CUSTOMER') {
        await cancel(data)
      }
      toast({
        title: 'Order Canceled succesfully',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      navigate('.', { replace: true })
    } catch (error) {
      toast({
        title: 'Error Canceling order',
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
            CANCEL Order
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure yo wanna CANCEL this order? You can&apos;t undo this
            action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme='red' onClick={handleCancelCart} ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
