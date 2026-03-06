import { Box, Center, Flex, Heading, Icon, Text } from '@chakra-ui/react'
import { CheckoutForm } from '../components/forms/checkout'
import { CartSection } from '../components/cards/cart-secion'
import { CartIcon } from '../components/icons/cart'
import useCart from '../store/cart'

export default function CheckoutPage() {
  const { items, getTotalPrice } = useCart()

  const subtotalCart = getTotalPrice()

  if (!items.length)
    return (
      <Box textAlign='center' py='10'>
        <Heading as='p' fontSize='6xl' fontWeight='semibold'>
          Oops
        </Heading>
        <Center gap='2' mt='4'>
          <Icon as={CartIcon} boxSize='8' />
          <Text fontSize='xl'>There are no products to purchase</Text>
        </Center>
      </Box>
    )

  return (
    <Flex
      mt='8'
      direction={{ base: 'column', lg: 'row' }}
      gap={8}
      alignItems={{ md: 'inherit', lg: 'start' }}
    >
      <CartSection items={items} subtotal={subtotalCart} />
      <CheckoutForm />
    </Flex>
  )
}
