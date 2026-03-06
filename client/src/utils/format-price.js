const formatPrice = (price) => {
  const formated = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)

  return formated
}

export default formatPrice
