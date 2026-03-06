import { useState } from 'react'
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Card,
  CardBody,
  FormErrorMessage
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import useAuth from '../store/auth'

export function ProfilePage() {
  const { user } = useAuth()
  const { username, email, address, phone } = user
  const {
    register,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: username,
      email: email,
      address: address,
      phone: phone,
      createdAt: '2024-01-01'
    }
  })

  return (
    <Container maxW='container.sm' py={10}>
      <Card boxShadow='lg' p={6}>
        <CardBody>
          <VStack spacing={6} align='stretch'>
            <Heading size='lg' mb={2}>
              Profile Information
            </Heading>

            <FormControl isInvalid={!!errors.username}>
              <FormLabel>Username</FormLabel>
              <Input
                {...register('username', {
                  required: 'Username is required'
                })}
              />
              <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                type='email'
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.address}>
              <FormLabel>Address</FormLabel>
              <Input
                {...register('address', {
                  required: 'Address is required'
                })}
              />
              <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.phone}>
              <FormLabel>Phone Number</FormLabel>
              <Input
                {...register('phone', {
                  required: 'Phone number is required'
                })}
              />
              <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
            </FormControl>

            <FormControl>
              <FormLabel>Created At</FormLabel>
              <Input
                {...register('createdAt')}
                isReadOnly
                _hover={{ cursor: 'not-allowed' }}
              />
            </FormControl>
          </VStack>
        </CardBody>
      </Card>
    </Container>
  )
}
