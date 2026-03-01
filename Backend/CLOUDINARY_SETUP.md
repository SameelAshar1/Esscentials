# Cloudinary Image Upload Setup

## Required npm packages (already installed)

```bash
cd Backend
npm install cloudinary multer
```

## Environment variables

Add to `.env` (or use `.env.example` as template):

```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Database migration (optional)

If upgrading from local uploads, run to ensure `image_url` supports long Cloudinary URLs:

```bash
npm run db:migrate:cloudinary
```

## Backend structure

```
Backend/
├── config/
│   ├── cloudinary.js      # Cloudinary config
│   └── database.js
├── middleware/
│   ├── adminAuth.js
│   └── upload.js          # Multer (memory storage for Cloudinary)
├── routes/
│   └── products.js        # POST/PUT upload to Cloudinary
├── utils/
│   └── cloudinaryUpload.js # uploadToCloudinary(buffer)
└── scripts/
    └── migrate-cloudinary.js
```

## Flow

1. Frontend sends `multipart/form-data` with `image` file via POST `/api/products`
2. Multer stores file in memory (no temp file on disk)
3. Buffer is uploaded to Cloudinary via `upload_stream`
4. `secure_url` is saved to `products.image_url`
5. Response includes created product with Cloudinary URL
