import FetchData from '.'

export const getAll = async (page = 1, size = 100) =>
  await FetchData(`/products/all?page=${page}&size=${size}`, 'GET')

export const getByCategoryAndName = async (category, name) => {
  return await FetchData(`/products/${category}/${name}`)
}

export const createOne = async (data) => {
  return await FetchData('/products/create', 'POST', data)
}

export const editProduct = async (data) => {
  return await FetchData('/products/edit', 'PUT', data)
}
