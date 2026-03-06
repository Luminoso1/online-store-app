import { getAll, getByCategoryAndName } from '../api/products'

export const filteredProductsLoader = async ({ params }) => {
  try {
    const category = params.productsCategory ?? ''

    const { products } = await getAll()

    const filtered =
      category === 'all' || category === ''
        ? products
        : products.filter((p) => p.category === category.toUpperCase())

    return { products: filtered }
  } catch (error) {
    console.error('Error fetching products. ', error.message)
    console.log('ERROR HERE')
    throw new Error(error.message)
  }
}

export const productsLoader = async ({ request }) => {
  const url = new URL(request.url)
  const page = Number(url.searchParams.get('page')) || 1
  const size = Number(url.searchParams.get('size')) || 5
  try {
    const { products, pagination } = await getAll(page, size)

    return { products, pagination }
  } catch (error) {
    console.error('Error fetching products. ', error.message)
    throw new Error(error.message)
  }
}

export const productLoader = async ({ params }) => {
  try {
    const category = params.productsCategory
    const name = params.productName

    const { product } = await getByCategoryAndName(category, name)

    return { product: product }
  } catch (error) {
    console.error('Error fetching product. ', error.message)
    throw new Error(error.message)
  }
}
