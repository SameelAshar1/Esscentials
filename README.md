# Candle Store Website

A full-stack e-commerce website for a candle store built with React, Express, Node.js, and PostgreSQL.

## Project Structure

```
Esscentials/
├── Backend/          # Express.js API server
│   ├── config/       # Database configuration
│   ├── routes/       # API routes
│   ├── scripts/      # Database migration scripts
│   └── uploads/      # Image uploads directory
└── Frontend/         # React frontend application
    └── src/
        ├── components/  # React components
        ├── pages/      # Page components
        └── services/   # API service
```

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Setup Instructions

### 1. Database Setup

1. Install PostgreSQL if you haven't already
2. Create a new database:
   ```sql
   CREATE DATABASE candle_store;
   ```
3. Update the database credentials in `Backend/.env`

### 2. Backend Setup

1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your database credentials:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=candle_store
   DB_USER=your_username
   DB_PASSWORD=your_password
   ```

5. Create the uploads directory:
   ```bash
   mkdir uploads
   ```

6. Run database migrations:
   ```bash
   npm run db:migrate
   ```

7. Start the backend server:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5000`

### 3. Frontend Setup

1. Open a new terminal and navigate to the Frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:3000`

## Features

- **Product Catalog**: Browse all available candles
- **Product Details**: View detailed information about each candle
- **Category Filtering**: Filter products by category
- **Search**: Search for candles by name or description
- **Image Upload**: Upload product images (backend feature)
- **Responsive Design**: Works on desktop and mobile devices

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product (with image upload)
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create new category

## Adding Products

You can add products through the API. Here's an example using curl:

```bash
curl -X POST http://localhost:5000/api/products \
  -F "name=Scented Vanilla Candle" \
  -F "description=A beautiful vanilla scented candle" \
  -F "price=24.99" \
  -F "category_id=3" \
  -F "stock_quantity=50" \
  -F "scent=Vanilla" \
  -F "size=Large" \
  -F "image=@/path/to/image.jpg"
```

## Development

- Backend uses `nodemon` for auto-restart during development
- Frontend uses Vite for fast development and hot module replacement
- Both servers should be running simultaneously for full functionality

## Production Build

### Frontend
```bash
cd Frontend
npm run build
```

The built files will be in the `dist/` directory.

### Backend
```bash
cd Backend
npm start
```

## Next Steps

- Add authentication and user management
- Implement shopping cart functionality
- Add payment processing
- Create admin dashboard
- Add product reviews and ratings
- Implement order management system

## License

ISC




