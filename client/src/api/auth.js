import FetchData from '.'

export const login = async (data) =>
  await FetchData('/auth/login', 'POST', data)

export const register = async (data) =>
  await FetchData('/auth/register', 'POST', data)

export const logout = async () => {
  return await FetchData('/auth/logout', 'GET')
}
