# How to Add Products to Your Candle Store

There are **three ways** to add products to your website:

## Method 1: Using the Admin Page (Easiest) ⭐

1. **Start your servers** (if not already running):
   - Backend: `cd Backend && npm run dev`
   - Frontend: `cd Frontend && npm run dev`

2. **Open your browser** and go to: `http://localhost:3000/admin`

3. **Fill out the form**:
   - Product Name (required)
   - Description
   - Price (required)
   - Stock Quantity (required)
   - Category (required) - Select from dropdown
   - Scent (optional)
   - Size (optional)
   - Product Image (optional) - Upload a candle image

4. **Click "Add Product"** - The product will be added and you'll be redirected to the products page!

## Method 2: Using cURL (Command Line)

If you prefer using the terminal, you can use curl:

```bash
curl -X POST http://localhost:5001/api/products \
  -F "name=Vanilla Dream Candle" \
  -F "description=A soothing vanilla scented candle perfect for relaxation" \
  -F "price=24.99" \
  -F "category_id=3" \
  -F "stock_quantity=50" \
  -F "scent=Vanilla" \
  -F "size=Large" \
  -F "image=@/path/to/your/image.jpg"
```

**Category IDs:**
- 1 = Soy Candles
- 2 = Beeswax Candles
- 3 = Scented Candles
- 4 = Decorative Candles

## Method 3: Directly in PostgreSQL Database

You can also insert products directly into the database:

```sql
psql candle_store

INSERT INTO products (name, description, price, category_id, stock_quantity, scent, size)
VALUES (
  'Lavender Serenity Candle',
  'A calming lavender scented candle for peaceful moments',
  29.99,
  3,
  30,
  'Lavender',
  'Medium'
);
```

## Available Categories

To see all available categories, you can:
- Check the admin page dropdown
- Visit: `http://localhost:5001/api/categories`
- Or run: `psql candle_store -c "SELECT * FROM categories;"`

## Tips

- **Images**: Upload high-quality images (JPG, PNG, GIF, or WebP)
- **Image Size**: Keep images under 5MB
- **Required Fields**: Name, Price, Category, and Stock Quantity are required
- **Optional Fields**: Description, Scent, Size, and Image are optional

## Viewing Your Products

After adding products, you can view them at:
- Products Page: `http://localhost:3000/products`
- Home Page: `http://localhost:3000` (shows featured products)




