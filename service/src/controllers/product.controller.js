import db from '../utils/db.js'
import { uploadToCloudinary } from '../utils/cloudinary.js'

export const createMany = async (req, res) => {
  try {
    const data = req.body
    const createProducts = data.map(async (product) => {
      const unit = await db.unit.findFirst({ where: { name: product.unit } })
      const category = await db.category.findFirst({
        where: { name: product.category }
      })

      if (!unit || !category) {
        throw new Error(
          `Unit or Category not found for product ${product.name}`
        )
      }

      return db.product.create({
        data: {
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          comments: product.comments,
          image: product.imageUrl,
          unitId: unit.id,
          categoryId: category.id
        }
      })
    })

    await Promise.all(createProducts)

    res.status(200).json({ message: 'Done' })
  } catch (error) {
    console.error('ERROR: ', error)
    res.status(500).json({ message: 'Error get all products order controller' })
  }
}

export const createOne = async (req, res) => {
  try {
    const file = req.file
    const product = JSON.parse(req.body.data)

    const unit = await db.unit.findFirst({ where: { name: product.unit } })

    const category = await db.category.findFirst({
      where: { name: product.category }
    })

    if (!unit || !category) {
      return res.status(400).jon({
        message: `Unit or Category not found for product ${product.name}`
      })
    }

    const result = await uploadToCloudinary(file.buffer)
    const imageUrl = result.secure_url

    const newProduct = await db.product.create({
      data: {
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        comments: product.comments,
        image: imageUrl,
        unitId: unit.id,
        categoryId: category.id
      }
    })
    return res
      .status(200)
      .json({ message: 'Product created successfully', newProduct })
  } catch (error) {
    console.log('ERROR: ', error)
    return res.status(500).json({ message: error.message })
  }
}

export const getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const pageSize = parseInt(req.query.size) || 5

    const skip = (page - 1) * pageSize
    const take = pageSize

    const products = await db.product.findMany({
      include: {
        unitId: false,
        categoryId: false,
        category: true,
        unit: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take
    })

    if (!products.length) {
      return res.status(200).json({ message: 'no products available' })
    }

    const totalProducts = await db.product.count()
    const totalPages = Math.ceil(totalProducts / pageSize)

    const formatedProducts = products.map((product) => ({
      ...product,
      category: product.category.name,
      unit: product.unit.name
    }))

    return res.status(200).json({
      products: formatedProducts,
      pagination: {
        total: totalProducts,
        pages: totalPages,
        current: page,
        size: products.length
      }
    })
  } catch (error) {
    console.error('ERROR: ', error)
    res.status(500).json({ message: 'Error get all products order controller' })
  }
}

export const getByCategoryAndName = async (req, res) => {
  try {
    let { categoryName, productName } = req.params

    const category = categoryName.replace(/-/g, ' ')
    const name = productName.replace(/-/g, ' ')

    const product = await db.product.findFirst({
      where: {
        category: {
          name: {
            contains: category
          }
        },
        name: {
          contains: name
        }
      },
      include: {
        category: true,
        unit: true
      }
    })

    if (!product) {
      return res.status(400).json({ message: 'no product available' })
    }

    const formatedProduct = {
      ...product,
      category: product.category.name,
      unit: product.unit.name
    }

    return res.status(200).json({ product: formatedProduct })
  } catch (error) {
    console.error('ERROR: ', error)
    res.status(500).json({ message: 'Error get by name product controller' })
  }
}

export const remove = async (req, res) => {
  try {
    const { id } = req.params

    const productDeleted = await db.product.delete({ where: { id: id } })

    if (!productDeleted) {
      return res.status(400).json({ message: 'product not found' })
    }

    return res.status(200).json({ message: 'product successfully deleted' })
  } catch (error) {
    console.error('ERROR: ', error)
    res.status(500).json({ message: 'Error remove product controller' })
  }
}

export const edit = async (req, res) => {
  try {
    const file = req.file
    const product = file ? JSON.parse(req.body.data) : req.body
    // console.log(product)
    console.log(file)

    let imageUrl = product?.image || ''

    if (file) {
      const result = await uploadToCloudinary(file.buffer)
      imageUrl = result.secure_url
    }

    const productDb = await db.product.update({
      where: { id: product.id },
      data: {
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        image: imageUrl,
        comments: product.comments
      }
    })

    if (!productDb) {
      return res
        .status(400)
        .json({ message: 'something went wrong updating product' })
    }

    return res.status(200).json({ message: 'product succesfully updated' })
  } catch (error) {
    console.error('ERROR: ', error)
    res.status(500).json({ message: 'Error edit product controller' })
  }
}

export const inactiveProduct = async (req, res) => {
  try {
  } catch (error) {}
}
