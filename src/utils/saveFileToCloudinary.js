import { Readable } from 'node:stream';
import { v2 as cloudinary } from 'cloudinary';

console.log('DEBUG CLOUDINARY:', {
  name: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY,
  secret: process.env.CLOUDINARY_API_SECRET,
});
cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function saveFileToCloudinary(buffer, userId) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'nodejs-hw-app/avatars',
        resource_type: 'image',
        public_id: `avatar_${userId}`,
        overwrite: true,
        unique_filename: false,
      },
      (err, result) => (err ? reject(err) : resolve(result)),
    );

    Readable.from(buffer).pipe(uploadStream);
  });
}
