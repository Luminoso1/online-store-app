export const adminMiddleware = async (req, res, next) => {
  try {
    const { user } = req.session

    if (user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'unauthorized' })
    }

    next()
  } catch (error) {
    console.error('ERROR: ', error)
    res.status(500).json({ message: 'Error order state controller' })
  }
}
