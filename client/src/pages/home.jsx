import { Categories } from '../components/categories'
import { ProductGrid } from '../components/product-grid'
import { useLoaderData } from 'react-router-dom'

export default function Home() {
  const { products } = useLoaderData()

  return (
    <>
      {/* categories */}

      <Categories />

      {/* products */}

      <ProductGrid products={products} />
    </>
  )
}
