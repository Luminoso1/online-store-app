import { Container, Grid, GridItem } from '@chakra-ui/react'
import { CardProduct } from './cards/card-product'

export const ProductGrid = ({ products }) => {
  return (
    <Container as='section' maxW='7xl' my='20' px='0'>
      <Grid
        templateColumns='repeat(auto-fit,minmax(240px, 1fr))'
        rowGap='10'
        columnGap='6'
        justifyContent='space-between'
      >
        {products?.map((product) => (
          <GridItem key={product.id}>
            <CardProduct product={product} />
          </GridItem>
        ))}
      </Grid>
    </Container>
  )
}
