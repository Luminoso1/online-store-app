import { Box, Text, VStack } from '@chakra-ui/react'
import { DeliveryIcon } from '../icons/delivery'
import { CartIcon } from '../icons/cart'
import { forwardRef } from 'react'

export const DeliveryMethodCard = forwardRef(
  ({ icon, title, description, isChecked, ...props }, ref) => {
    return (
      <Box as='label' w='full' cursor='pointer' position='relative'>
        <input
          type='radio'
          ref={ref}
          style={{ position: 'absolute', opacity: 0 }}
          {...props}
        />
        <Box
          bg='white'
          borderWidth='1px'
          borderRadius='lg'
          px={5}
          py={4}
          transition='all 0.2s'
          _hover={{
            borderColor: 'blue.500'
          }}
          {...(isChecked && {
            bg: 'blue.50',
            borderColor: 'blue.500',
            transform: 'scale(1.02)'
          })}
        >
          <VStack spacing={2} align='flex-start'>
            <Box color={isChecked ? 'blue.500' : 'gray.600'}>
              {icon === 'shipping' ? (
                <DeliveryIcon size={24} />
              ) : (
                <CartIcon size={24} />
              )}
            </Box>
            <Text fontWeight='semibold' fontSize='lg'>
              {title}
            </Text>
            <Text color='gray.600' fontSize='sm'>
              {description}
            </Text>
          </VStack>
        </Box>
      </Box>
    )
  }
)

DeliveryMethodCard.displayName = 'DeliveryMethodCard'
