import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (folder, uniqueFilename, image) => {
    const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: folder, public_id: uniqueFilename }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
        }).end(image);
    });
    return result
}

export  {cloudinary, uploadImage};