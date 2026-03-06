import { Flex, Stack } from '@chakra-ui/react'
import { CardCategory } from './cards/card-category'
import categories from '../utils/categories'

export const Categories = () => {
  return (
    <Stack
      as='section'
      maxW='7xl'
      mt='12'
      // px={{ base: '4', md: '8' }}
      position={{ base: 'static', lg: 'sticky' }}
      top='0'
      zIndex='modal'
      bg='rgba(255, 255, 255, 0.8)'
      backdropFilter='blur(10px)'
    >
      <Flex
        gap={{ base: '2', md: '4' }}
        wrap='wrap'
        justifyContent={{
          base: 'center',
          md: 'space-between',
          lg: 'space-between'
        }}
      >
        {categories.map((category) => (
          <CardCategory
            key={category.text}
            icon={category.icon}
            text={category.text}
          />
        ))}
      </Flex>
    </Stack>
  )
}
