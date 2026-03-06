import { redirect } from 'react-router-dom'
import { getAllByUser, getAllCarts } from '../api/cart'
import useAuth from '../store/auth'

export const cartsLoader = async ({ request }) => {
  const url = new URL(request.url)
  const page = Number(url.searchParams.get('page')) || 1
  const size = Number(url.searchParams.get('size')) || 5

  try {
    const { carts, pagination } = await getAllCarts(page, size)

    console.log(carts)
    return { carts, pagination }
  } catch (error) {
    throw new Error(`error getting the user cart ${error.messsage}`)
  }
}

export const cartUserLoader = async ({ request }) => {
  const { isAuth } = useAuth.getState()

  if (!isAuth) return redirect('/login')

  const url = new URL(request.url)
  const page = Number(url.searchParams.get('page')) || 1
  const size = Number(url.searchParams.get('size')) || 5
  try {
    const data = await getAllByUser(page, size)
    return { carts: data.carts, pagination: data.pagination }
  } catch (error) {
    throw new Error(`error getting the user cart ${error.messsage}`)
  }
}
