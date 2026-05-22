import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
    region: "auto",
    endpoint: process.env.S3_ENDPOINT,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY
    }
});

export async function uploadImage(buffer, filename, type) {

    await s3.send(new PutObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: filename,
        Body: buffer,
        ContentType: type
    }));
}

export async function deleteImage(filename) {

    await s3.send(new DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: filename
    }));
}