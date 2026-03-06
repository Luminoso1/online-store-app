import { Badge } from '@chakra-ui/react'

export const ProductBadge = ({ value }) => {
  return (
    <Badge fontWeight='semibold' px='3' py='1'>
      {value}
    </Badge>
  )
}
