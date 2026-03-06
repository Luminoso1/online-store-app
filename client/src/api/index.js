const SERVER_URL = import.meta.env.VITE_SERVER_URL

export default async function FetchData(endpoint, method, data) {
  try {
    const res = await fetch(`${SERVER_URL}${endpoint}`, settings(method, data))
    
    const body = await res.json()

    console.log('BODY ', body)

    if (res.status === 401 || body.message === 'not authorized') {
      localStorage.removeItem('auth')
      console.log("hello");
    }

    if (!res.ok) {
      console.log(res)
      throw new Error(body.message)
    }
    return body
  } catch (error) {
    console.log(`Error in API: ${error}`)
    throw error
  }
}

const settings = (method, body) => {
  const isFormData = body instanceof FormData
  return {
    method,
    headers: isFormData
      ? { Accept: 'application/json' } // Form Data
      : {
          Accept: 'application/json',
          'Content-Type': 'application/json' //  JSON
        },
    credentials: 'include',
    body: isFormData ? body : JSON.stringify(body)
  }
}
