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
import { login as loginUser } from '../api/auth'
import useAuth from '../store/auth'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const location = useLocation()
  const navigate = useNavigate()

  const toast = useToast()
  const { login } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: 'noexistuser16@gmail.com',
      password: 'AdminPass123#'
    }
  })

  const onSubmit = async (data) => {
    try {
      const { user } = await loginUser(data)
      login(user)
      toast({
        title: 'Login succesfully',
        description: 'Continue on your way',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      const from = location?.state?.from || '/'
      console.log('FROM: ', from)
      navigate(from)
    } catch (error) {
      toast({
        title: 'Login failed',
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
        Login
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack>
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
                  message: 'Invalid Email'
                }
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          {/* Password */}
          <FormControl isInvalid={errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type='password'
              placeholder='domo1234##'
              {...register('password', {
                required: 'Password is required.',
                minLength: {
                  value: 8,
                  message: 'Password must contain  8 characters'
                }
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          {/* Submit Button */}
          <Button type='submit' colorScheme='blue' w='full' mt='4'>
            Log in
          </Button>

          {/* Register Link */}
          <Text fontSize='sm' mt='4' color='gray.600'>
            ¿Don&apos;t have an account?{' '}
            <Link
              as={RouterLink}
              to='/register'
              color='blue.500'
              fontWeight='bold'
            >
              Register here
            </Link>
          </Text>
        </VStack>
      </form>
    </Box>
  )
}
