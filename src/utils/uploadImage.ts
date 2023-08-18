import { v2 as cloudinary } from 'cloudinary';

const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config(apiKey, apiSecret);

export function uploadImage() {
  console.log(apiKey, apiSecret);
}
