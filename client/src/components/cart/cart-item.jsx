import { Box, Flex, Image, Stack, Text, useToast } from '@chakra-ui/react'
import useCart from '../../store/cart'
import { formatPrice } from '../../utils/format'
import { ActionsBtns } from '../action-btns'
import papaya from '../../assets/papaya.webp'

export default function CartItem({ product }) {
  const toast = useToast()
  const { id, name, image, price } = product

  const { increaseQuantity, decreaseQuantity, getItemQuantity } = useCart()

  const handleIncrease = () => {
    try {
      increaseQuantity(id)
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }

  const productCartQuantity = getItemQuantity(id)

  return (
    <Box direction='row' alignItems='center' justifyContent='space-between'>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Image src={image} boxSize='14' alt={name} />

        <ActionsBtns
          value={productCartQuantity}
          increase={handleIncrease}
          decrease={() => decreaseQuantity(id)}
        />
      </Stack>
      <Flex alignItems='center' justifyContent='space-between' mt='2'>
        <Text fontWeight='semibold'>
          {name}
          <Box as='span' fontSize='sm' fontWeight='normal' ml='2'>
            x {formatPrice(price)}
          </Box>
        </Text>
        <Text fontSize='sm' fontWeight='normal' textAlign='right'>
          {formatPrice(price * productCartQuantity)}
        </Text>
      </Flex>
    </Box>
  )
}
