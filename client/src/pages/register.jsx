import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  useToast,
  VStack
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { Link as RouterLink } from 'react-router-dom'
import useAuth from '../store/auth'
import { register as registerUser } from '../api/auth'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

export default function RegisterPage() {
  const toast = useToast()
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      address: '',
      phone: '',
      password: ''
    }
  })

  const onSubmit = async (data) => {
    try {
      await registerUser(data)
      // login(user)
      toast({
        title: 'Register succesfully',
        description: 'Continue on your way',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      const from = location?.state?.from || '/login'
      console.log('FROM: ', from)
      navigate(from)
    } catch (error) {
      toast({
        title: 'Register failed',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }

  return (
    <Box maxW='md' mx='auto' mt='10' p='6' rounded='lg' boxShadow='lg'>
      <Heading as='h2' size='lg' mb='6' textAlign='center'>
        Register
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack>
          {/* username */}
          <FormControl isInvalid={errors.username}>
            <FormLabel>Username</FormLabel>
            <Input
              type='text'
              placeholder='dog'
              {...register('username', {
                required: 'Username is required'
              })}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>

          {/* email */}
          <FormControl isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type='email'
              placeholder='dog@gmail.com'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Invalid email'
                }
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          {/* Address */}
          <FormControl isInvalid={errors.address}>
            <FormLabel>Address</FormLabel>
            <Input
              type='text'
              placeholder='cra 20 #32-32'
              {...register('address', {
                required: 'Address is required'
              })}
            />
            <FormErrorMessage>
              {errors.address && errors.address.message}
            </FormErrorMessage>
          </FormControl>

          {/* Phone */}
          <FormControl isInvalid={errors.phone}>
            <FormLabel>Phone number</FormLabel>
            <Input
              type='tel'
              placeholder='+1 321 213 231'
              {...register('phone', {
                required: 'Phone is required',
                pattern: {
                  value:
                    /^\+?\d{1,4}[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
                  message: 'Invalid phone'
                }
              })}
            />
            <FormErrorMessage>
              {errors.phone && errors.phone.message}
            </FormErrorMessage>
          </FormControl>

          {/* Password */}
          <FormControl isInvalid={errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type='password'
              placeholder='domo1234##'
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must contain min 8 chars'
                }
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          {/* Submit Button */}
          <Button type='submit' colorScheme='blue' w='full' mt='4'>
            Registrarse
          </Button>

          {/* Register Link */}
          <Text fontSize='sm' mt='4' color='gray.600'>
            ¿Already have an account?{' '}
            <Link
              as={RouterLink}
              to='/login'
              color='blue.500'
              fontWeight='bold'
            >
              Login here
            </Link>
          </Text>
        </VStack>
      </form>
    </Box>
  )
}
