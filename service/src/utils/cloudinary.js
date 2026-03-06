import { v2 as cloudinary } from 'cloudinary'
import crypto from 'crypto'
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

export const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('md5').update(buffer).digest('hex')
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'shop_products',
        public_id: hash,
        use_filename: false,
        unique_filename: false,
        overwrite: false
      },
      (error, result) => {
        if (error) {
          return reject(new Error('Error uploading image to cloudinary'))
        }
        resolve(result)
      }
    )
    stream.end(buffer)
  })
}
