import {
  Box,
  Image,
  VStack,
  HStack,
  Text,
  Heading,
  Divider
} from '@chakra-ui/react'
import { CartIcon } from '../icons/cart'
import { formatPrice } from '../../utils/format'

export const CartSection = ({ items, subtotal }) => {
  const shipping = subtotal > 20 ? 4 : subtotal * 0.1
  const total = subtotal + shipping

  return (
    <Box flex={1} bg='white' p={6} borderRadius='lg' boxShadow='lg'>
      <HStack spacing={2} mb={6}>
        <CartIcon />
        <Heading size='md'>Your Cart</Heading>
      </HStack>

      <VStack spacing={4} align='stretch' overflowY='auto' maxH='96'>
        {items.map((item) => (
          <HStack key={item.id} spacing={4}>
            <Image
              src={item.image}
              alt={item.name}
              boxSize='100px'
              objectFit='cover'
              borderRadius='md'
            />
            <Box flex={1}>
              <Text fontWeight='semibold'>{item.name}</Text>
              <Text color='gray.600'>Quantity: {item.quantityBuy}</Text>
              <Text color='blue.600' fontWeight='bold'>
                {formatPrice(item.price)}
              </Text>
            </Box>
          </HStack>
        ))}
      </VStack>

      <Divider my={6} />

      <VStack spacing={3} align='stretch'>
        <HStack justify='space-between'>
          <Text>Subtotal</Text>
          <Text>{formatPrice(subtotal)}</Text>
        </HStack>
        <HStack justify='space-between'>
          <Text>Shipping</Text>
          <Text>${formatPrice(shipping)}</Text>
        </HStack>
        <HStack justify='space-between' fontWeight='bold'>
          <Text>Total</Text>
          <Text>{formatPrice(total)}</Text>
        </HStack>
      </VStack>
    </Box>
  )
}
