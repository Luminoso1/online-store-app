import {
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Icon,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { useRef } from 'react'
import { CartIcon } from '../icons/cart'
import { formatPrice } from '../../utils/format'
import CartItem from './cart-item'

import useCart from '../../store/cart'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function Cart() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { items, getTotalPrice } = useCart()
  const cartTotalPrice = getTotalPrice()
  const totalItems = items.length

  return (
    <>
      <Button
        ref={btnRef}
        onClick={onOpen}
        bg='transparent'
        border='1px'
        rounded='full'
        w='10'
        height='10'
        borderColor='blackAlpha.500'
        position='relative'
      >
        <Icon as={CartIcon} boxSize={6} />
        {totalItems > 0 && (
          <Box
            position='absolute'
            top='-4'
            zIndex='modal'
            bg='blue.500'
            colorScheme="blue"
            w='6'
            h='6'
            rounded='full'
            fontSize='sm'
            color='whiteAlpha.800'
            display='flex'
            justifyContent='center'
            alignItems='center'
          >
            {totalItems}
          </Box>
        )}
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
        blockScrollOnMount={true}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Cart</DrawerHeader>

          <DrawerBody
            css={{
              '&::-webkit-scrollbar': { display: 'none' }
            }}
          >
            <Container p='0' display='flex' flexDir='column' gap='12'>
              {items.map((product) => (
                <CartItem key={product.id} product={product} />
              ))}
            </Container>
          </DrawerBody>

          <DrawerFooter flexDir='column'>
            <Flex
              w='full'
              mb='4'
              justifyContent='space-between'
              alignItems='center'
            >
              <Heading as='h4' fontSize='lg'>
                Total
              </Heading>
              <Text>{formatPrice(cartTotalPrice)}</Text>
            </Flex>
            <Button
              colorScheme='blue'
              w='full'
              onClick={() => {
                onClose()
                navigate('/checkout', {
                  state: { from: pathname }
                })
              }}
              to='/checkout'
            >
              Checkout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
