import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Skeleton,
  Text
} from '@chakra-ui/react'
import { ProductBadge } from '../components/product-badge'
import { formatPrice } from '../utils/format'
import { CartIcon } from '../components/icons/cart'
import { useLoaderData } from 'react-router-dom'
import { ActionsBtns } from '../components/action-btns'
import useCart from '../store/cart'

export default function Product() {
  const { product } = useLoaderData()
  const { id, name, price, quantity, image, comments, category, unit } = product

  const { addItem, getItemQuantity, increaseQuantity, decreaseQuantity } =
    useCart()

  const productQuantityBuy = getItemQuantity(product.id)
  return (
    <>
      {product ? (
        <Container as='section' mt='20' maxW='4xl'>
          <Flex
            gap='20'
            justifyContent='center'
            flexDirection={{ base: 'column', lg: 'row' }}
            alignItems='center'
          >
            <Box boxSize='full' maxW='72' overflow='hidden'>
              <Image src={image} alt={name} />
            </Box>
            <Box maxW='80' w='full'>
              <Flex justifyContent='space-between' alignItems='center'>
                <ProductBadge value={category} />
                <Text fontSize='lg'>{formatPrice(price)}</Text>
              </Flex>
              <Flex justifyContent='space-between' py='1' alignItems='center'>
                <Text fontSize='2xl' fontWeight='semibold'>
                  {name}
                </Text>
                <ProductBadge value={unit} />
              </Flex>

              <Text fontSize='normal' py='6'>
                {comments}
              </Text>

              {productQuantityBuy > 0 ? (
                <>
                  <ActionsBtns
                    value={productQuantityBuy}
                    increase={() => increaseQuantity(id)}
                    decrease={() => decreaseQuantity(id)}
                  />

                  <Flex
                    justifyContent='space-between'
                    py='6'
                    alignItems='center'
                  >
                    <Text fontSize='lg' fontWeight='semibold'>
                      Total
                    </Text>
                    <Text fontSize='lg' fontWeight='semibold'>
                      {formatPrice(productQuantityBuy * price)}
                    </Text>
                  </Flex>
                </>
              ) : (
                <Button
                  w='full'
                  colorScheme='blue'
                  color='white'
                  leftIcon={<CartIcon width='24px' />}
                  onClick={() => addItem({ id, name, price, quantity, image })}
                >
                  Add to card
                </Button>
              )}
            </Box>
          </Flex>
        </Container>
      ) : (
        <Flex gap='6' justifyContent='center' mt='20'>
          <Skeleton height='350px' width='350px' />
          <Skeleton height='350px' width='350px' />
        </Flex>
      )}
    </>
  )
}
