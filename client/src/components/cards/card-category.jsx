import {
  Card,
  CardBody,
  Center,
  Icon,
  Link,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom'

export const CardCategory = ({ icon, text }) => {
  const location = useLocation()
  const isActive = location.pathname === `/${text}`
  const activeBg = useColorModeValue('blue.100', 'blue.700')

  return (
    <Card
      minWidth={{ base: '80px', md: '110px', lg: '140px' }}
      flexBasis={{ base: '30%', sm: '20%', md: 'auto' }}
      height={{ base: '60px', md: '80px' }}
      p='0'
      as='article'
      bg={isActive ? activeBg : ''}
      _hover={{ bg: useColorModeValue('gray.100', 'gray.600') }}
      transition='background-color 0.3s ease-in-out'
    >
      <Link
        as={RouterLink}
        to={`/${text}`}
        w='full'
        h='full'
        display='flex'
        justifyContent='center'
        alignItems='center'
        _hover={{ textDecoration: 'none' }}
      >
        <CardBody p='0' display='flex' justifyContent='center'>
          <Center flexDir='column' gap='1'>
            {icon && <Icon as={icon} boxSize={{ base: 5, md: 6 }} />}
            <Text
              fontWeight='normal'
              fontSize={{ base: 'xs', md: 'sm' }}
              textTransform='capitalize'
            >
              {text}
            </Text>
          </Center>
        </CardBody>
      </Link>
    </Card>
  )
}
