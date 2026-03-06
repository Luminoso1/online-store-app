import db from '../utils/db.js'

export const createAndFill = async (req, res) => {
  try {
    const { user } = req.session
    const { products, deliveryMethod, paymentMethod } = req.body

    console.log('PRODUCTS: ', deliveryMethod)

    if (!products.length) {
      return res.status(400).json({ message: 'no products found' })
    }

    // create a new cart
    const cart = await db.cart.create({
      data: {
        userId: user.id,
        total: 0,
        paymentMethod: paymentMethod,
        deliveryMethod: deliveryMethod
      }
    })

    // all ids of products
    const productsIds = products.map((product) => product.id)

    // get all products from db
    const productsData = await db.product.findMany({
      where: { id: { in: productsIds } }
    })

    // create all orders with products selected within the cart
    let carTotal = 0

    const ordersData = products.map((product) => {
      const productDb = productsData.find((p) => p.id === product.id)
      const totalOrder =
        parseFloat(productDb.price) * parseFloat(product.quantity)

      carTotal += totalOrder

      return {
        quantity: product.quantity,
        cartId: cart.id,
        productId: productDb.id,
        totalOrder
      }
    })

    await db.order.createMany({
      data: ordersData
    })

    // update total cart
    const updatedCart = await db.cart.update({
      where: { id: cart.id },
      data: { total: carTotal }
    })

    res.status(201).json({
      message: 'Cart and orders created successfully',
      cart: {
        id: updatedCart.id,
        state: updatedCart.state,
        total: updatedCart.total
      }
    })
  } catch (error) {
    console.error('ERROR: ', error)
    res.status(500).json({ message: 'Error create order controller' })
  }
}

export const getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const pageSize = parseInt(req.query.size) || 5

    const skip = (page - 1) * pageSize
    const take = pageSize

    const carts = await db.cart.findMany({
      orderBy: {
        state: 'desc'
      },
      select: {
        id: true,
        date: true,
        state: true,
        total: true,
        paymentMethod: true,
        deliveryMethod: true,
        user: {
          select: {
            id: true,
            username: true
          }
        },
        orders: {
          select: {
            id: true,
            product: {
              select: {
                name: true,
                image: true,
                price: true
              }
            },
            quantity: true
          }
        }
      },

      skip,
      take
    })

    if (!carts.length) {
      return res.status(200).json({ message: 'no carts available' })
    }

    const totalCarts = await db.cart.count()
    const totalPages = Math.ceil(totalCarts / pageSize)

    return res.status(200).json({
      carts,
      pagination: {
        total: totalCarts,
        pages: totalPages,
        current: page,
        size: carts.length
      }
    })
  } catch (error) {
    console.error('ERROR: ', error)
    res.status(500).json({ message: 'Error get all carts controller' })
  }
}

export const getAllByUser = async (req, res) => {
  const { user } = req.session
  try {
    const page = parseInt(req.query.page) || 1
    const pageSize = parseInt(req.query.size) || 5

    const skip = (page - 1) * pageSize
    const take = pageSize

    const carts = await db.cart.findMany({
      where: { userId: user.id },
      orderBy: {
        state: 'desc'
      },
      select: {
        id: true,
        date: true,
        state: true,
        total: true,
        deliveryMethod: true,
        paymentMethod: true,
        orders: {
          select: {
            id: true,
            product: {
              select: {
                name: true,
                image: true,
                price: true
              }
            },
            quantity: true
          }
        }
      },

      skip,
      take
    })

    const totalCarts = await db.cart.count()
    const totalPages = Math.ceil(totalCarts / pageSize)
    const pagination = {
      total: totalCarts,
      pages: totalPages,
      current: page,
      size: carts.length
    }

    if (!carts.length) {
      return res.status(200).json({
        message: 'no carts available',
        pagination
      })
    }

    return res.status(200).json({
      carts,
      pagination
    })
  } catch (error) {
    console.error('ERROR: ', error)
    res.status(500).json({ message: 'Error get all carts controller' })
  }
}
export const updateState = async (req, res) => {
  try {
    const { id, newState } = req.body

    // Obtiene el carrito actual
    const cartDb = await db.cart.findUnique({
      where: { id }
    })

    if (!cartDb) {
      return res.status(404).json({ message: 'Order not found' })
    }

    // verificar si ya está completado

    if (cartDb.state === 'COMPLETED') {
      return res.status(400).json({
        message: `Order is already in state: COMPLETED`,
        cart: cartDb
      })
    }

    // Verifica si el estado ya es el mismo
    if (cartDb.state === newState) {
      return res.status(200).json({
        message: `Order is already in state: ${newState}`,
        cart: cartDb
      })
    }

    // Actualiza el estado del carrito
    const cartUpdated = await db.cart.update({
      where: { id: cartDb.id },
      data: { state: newState }
    })

    const ordersCart = await db.order.findMany({
      where: { cartId: cartDb.id },
      include: {
        product: true
      }
    })

    if (!ordersCart.length) {
      return res.status(400).json({ message: 'no products' })
    }

    if (newState === 'COMPLETED') {
      const products = ordersCart.map((order) => {
        return {
          id: order.product.id,
          quantity: order.quantity
        }
      })

      // update products quantity
      const updateProducts = products.map((product) => {
        return db.product.update({
          where: { id: product.id },
          data: {
            quantity: {
              decrement: parseFloat(product.quantity)
            }
          }
        })
      })

      await Promise.all(updateProducts)

      return res
        .status(200)
        .json({ message: 'Order successfully COMPLETED', orders: products })
    } else if (newState === 'CANCELED') {
      return res
        .status(200)
        .json({ message: 'Order successfully CANCELED', orders: ordersCart })
    }

    return res.status(200).json({
      message: 'Order successfully PENDING',
      orders: ordersCart,
      cartUpdated
    })
  } catch (error) {
    console.error('ERROR: ', error)
    res.status(500).json({ message: 'Error order state controller' })
  }
}

export const cancelUserCart = async (req, res) => {
  try {
    const { user } = req.session
    const { id, newState } = req.body

    // Obtiene el carrito actual
    const cartDb = await db.cart.findUnique({
      where: { id, userId: user.id }
    })

    if (!cartDb) {
      return res.status(404).json({ message: 'Cart not found' })
    }

    // verificar si ya está completo

    if (cartDb.state === 'COMPLETED') {
      return res.status(400).json({
        message: `Cart is already in state: COMPLETED`,
        cart: cartDb
      })
    }

    // Verifica si el estado ya es el mismo
    if (cartDb.state === newState) {
      return res.status(400).json({
        message: `Cart is already in state: ${newState}`,
        cart: cartDb
      })
    }

    // Actualiza el estado del carrito
    const cartUpdated = await db.cart.update({
      where: { id: cartDb.id },
      data: { state: newState }
    })

    return res.status(200).json({
      message: 'Order successfully CANCELED',
      cartUpdated
    })
  } catch (error) {
    console.error('ERROR: ', error)
    res.status(500).json({ message: 'Error order state controller' })
  }
}
