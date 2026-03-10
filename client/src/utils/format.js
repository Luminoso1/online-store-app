export const formatProductName = (name) => {
  return name.toLowerCase().replace(/\s+/g, '-')
}

export const formatPrice = (price) => {
  const formated = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)

  return formated
}

export const formatDate = (date) => {
  const formated = new Intl.DateTimeFormat('es-MX').format(date)
  return formated
}


