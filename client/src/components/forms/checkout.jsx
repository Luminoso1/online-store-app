import React from 'react'
import {
  Box,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  Radio,
  Button,
  FormErrorMessage,
  useToast,
  HStack,
  Stack
} from '@chakra-ui/react'
import { DeliveryMethodCard } from '../cards/delivery-method'
import { useForm } from 'react-hook-form'
import useAuth from '../../store/auth'
import useCart from '../../store/cart'
import { createAndFill } from '../../api/cart'
export const CheckoutForm = () => {
  const { user } = useAuth()
  const { items, clearCart } = useCart()
  const toast = useToast()

  const { username, email, address, phone } = user

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch
  } = useForm({
    defaultValues: {
      deliveryMethod: 'DELIVERY',
      paymentMethod: 'CREDIT'
    }
  })

  const deliveryMethod = watch('deliveryMethod')

  const onSubmit = async (data) => {
    const { deliveryMethod, paymentMethod } = data
    const products = items.map((item) => ({
      id: item.id,
      quantity: item.quantityBuy
    }))
    const request = { products, deliveryMethod, paymentMethod }

    try {
      // Simulate API call
      console.log(request)
      await createAndFill(request)
      clearCart()
      toast({
        title: 'Order placed successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true
      })
    } catch (error) {
      toast({
        title: 'Error placing order',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
  }

  return (
    <Box flex={1} bg='white' p={6} borderRadius='lg' boxShadow='md'>
      <VStack
        as='form'
        spacing={6}
        align='stretch'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Heading size='md'>Shipping Information</Heading>

        <FormControl isInvalid={!!errors.deliveryMethod}>
          <FormLabel>Delivery Method</FormLabel>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <DeliveryMethodCard
              {...register('deliveryMethod', {
                required: 'Please select a delivery method'
              })}
              icon='shipping'
              title='Home Delivery'
              description='Get your items delivered to your doorstep within 2-4 business days'
              value='DELIVERY'
              isChecked={deliveryMethod === 'DELIVERY'}
              ref={register('deliveryMethod').ref}
            />
            <DeliveryMethodCard
              {...register('deliveryMethod')}
              icon='pickup'
              title='Store Pickup'
              description='Pick up your items from our nearest store location within 24 hours'
              value='PICKUP'
              isChecked={deliveryMethod === 'PICKUP'}
              ref={register('deliveryMethod').ref}
            />
          </Stack>
          <FormErrorMessage>{errors.deliveryMethod?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.username}>
          <FormLabel>Username</FormLabel>
          <Input {...register('username')} value={username} disabled={true} />
          <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            {...register('email')}
            type='email'
            value={email}
            disabled={true}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        {deliveryMethod === 'DELIVERY' && (
          <>
            <FormControl isInvalid={!!errors.phone}>
              <FormLabel>Phone Number</FormLabel>
              <Input
                {...register('phone')}
                type='tel'
                value={phone}
                disabled={true}
              />
              <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.address}>
              <FormLabel>Address</FormLabel>
              <Input {...register('address')} value={address} disabled={true} />
              <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
            </FormControl>
          </>
        )}

        <FormControl>
          <FormLabel>Payment Method</FormLabel>
          <RadioGroup defaultValue='CREDIT'>
            <HStack spacing={8}>
              <Radio {...register('paymentMethod')} value='CREDIT'>
                Credit Card
              </Radio>
              <Radio {...register('paymentMethod')} value='DEBIT'>
                Debit Card
              </Radio>
              <Radio {...register('paymentMethod')} value='CASH'>
                Cash
              </Radio>
            </HStack>
          </RadioGroup>
        </FormControl>

        <Button
          mt='4'
          type='submit'
          colorScheme='blue'
          size='lg'
          isLoading={isSubmitting}
          leftIcon={<CreditCard size={20} />}
        >
          Place Order
        </Button>
      </VStack>
    </Box>
  )
}

export function CreditCard(props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1.5em'
      height='1.5em'
      viewBox='0 0 24 24'
      {...props}
    >
      <path
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.5}
        d='M3 9v-.8c0-1.12 0-1.68.218-2.108c.192-.377.497-.682.874-.874C4.52 5 5.08 5 6.2 5h11.6c1.12 0 1.68 0 2.107.218c.377.192.683.497.875.874c.218.427.218.987.218 2.105V9M3 9h18M3 9v6.8c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.427.218.987.218 2.105.218h11.606c1.118 0 1.677 0 2.104-.218c.377-.192.683-.498.875-.874c.218-.428.218-.986.218-2.104V9M6 15h4'
      ></path>
    </svg>
  )
}
