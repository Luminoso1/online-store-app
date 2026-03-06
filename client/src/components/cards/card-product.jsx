import {
  Badge,
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text
} from '@chakra-ui/react'
import { ProductBadge } from '../product-badge'
import { formatProductName, formatPrice } from '../../utils/format'
import { Link } from 'react-router-dom'
import { ActionsBtns } from '../action-btns'
import useCart from '../../store/cart'

export const CardProduct = ({ product }) => {
  const { id, name, image, category, price, unit, comments } = product

  const { getItemQuantity, increaseQuantity, decreaseQuantity } = useCart()
  const productQuantityBuy = getItemQuantity(id)
  return (
    <Card w='full' pb='4' className='card__product'>
      <CardHeader position='relative'>
        <Badge
          as='span'
          fontWeight='normal'
          px='1'
          py='1'
          position='absolute'
          left='0'
          top='0'
        >
          {category}
        </Badge>
        <Center>
          <Box boxSize='44' overflow='hidden' rounded='lg'>
            <Image src={image} alt={name} className='card__product-img' />
          </Box>
        </Center>
      </CardHeader>
      <CardBody>
        <Stack direction='column'>
          <Heading as='h3' fontSize='xl' fontWeight='semibold'>
            <Link
              to={`/${formatProductName(category)}/${formatProductName(name)}`}
            >
              {name}
            </Link>
          </Heading>
          <Flex justify='space-between' alignItems='center'>
            <Text fontSize='xl'>{formatPrice(price)}</Text>

            <ProductBadge value={unit} />
          </Flex>
          <Flex>
            <Text>{comments}</Text>
            {productQuantityBuy > 0 && (
              <ActionsBtns
                value={productQuantityBuy}
                increase={() => increaseQuantity(id)}
                decrease={() => decreaseQuantity(id)}
              />
            )}
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  )
}
