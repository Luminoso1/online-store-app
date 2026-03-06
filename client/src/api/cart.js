import FetchData from '.'

// CUSTOMER
export const createAndFill = async (data) => {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return await FetchData('/cart/create', 'POST', data)
}
export const getAllByUser = async (page, size) => {
  return await FetchData(`/cart/user/all?page=${page}&size=${size}`, 'GET')
}
export const cancel = async (data) => {
  return await FetchData('/cart/user/cancel', 'POST', data)
}


// ADMIN
export const getAllCarts = async (page, size) => {
  return await FetchData(`/cart/all?page=${page}&size=${size}`, 'GET')
}

export const changeState = async (data) => {
  return await FetchData('/cart/update-state', 'POST', data)
}
