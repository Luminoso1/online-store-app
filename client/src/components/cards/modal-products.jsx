import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react'
import formatPrice from '../../utils/format-price'

export const ModalProducts = ({ isOpen, onClose, cart }) => {
  if (!cart) {
    return null // No renderiza nada si `cart` es nulo
  }
  const { date, orders } = cart
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{date}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb='8'>
          {orders?.map(({ id, product, quantity }) => (
            <>
              <HStack
                key={id}
                spacing='4'
                justifyContent='space-between'
                my='4'
              >
                <Center gap='3'>
                  <Box boxSize='16' overflow='hidden' rounded='lg'>
                    {' '}
                    <Image src={product.image} alt={product.name} />
                  </Box>
                  <Text>{product.name}</Text>
                </Center>
                <Center gap='2' alignItems='end'>
                  <Text fontSize='sm'>{quantity} x </Text>
                  <Text>{formatPrice(product.price)}</Text>
                </Center>
              </HStack>
              <Divider />
            </>
          ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
