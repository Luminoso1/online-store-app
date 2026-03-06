import { Button, Flex, Text } from '@chakra-ui/react'

export const ActionsBtns = ({ value, increase, decrease }) => {
  return (
    <Flex gap='2' alignItems='center'>
      <Button onClick={increase}>+</Button>

      <Text
        p='2'
        border='1px'
        borderColor='gray'
        rounded='md'
        minW='20'
        w='full'
        textAlign='center'
        maxWidth='2xl'
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='auto'
      >
        {value}
      </Text>

      <Button onClick={decrease}>-</Button>
    </Flex>
  )
}
