# Quick Start Guide for VS Code

## Step-by-Step Setup

### 1. Open the Project in VS Code
- Open VS Code
- File → Open Folder → Select the `Esscentials` folder

### 2. Install PostgreSQL (if not already installed)
- **macOS**: `brew install postgresql@14` then `brew services start postgresql@14`
- **Windows**: Download from https://www.postgresql.org/download/windows/
- **Linux**: `sudo apt-get install postgresql postgresql-contrib`

### 3. Create Database
Open a terminal in VS Code (Terminal → New Terminal) and run:
```bash
# Connect to PostgreSQL
psql postgres

# In PostgreSQL prompt, run:
CREATE DATABASE candle_store;
\q
```

### 4. Setup Backend

Open a new terminal in VS Code (you can split terminals):
```bash
cd Backend
npm install
```

Create `.env` file:
```bash
cp .env.example .env
```

Edit `.env` and update with your PostgreSQL credentials:
- `DB_USER`: Your PostgreSQL username (usually `postgres` or your system username)
- `DB_PASSWORD`: Your PostgreSQL password

Create uploads directory and run migrations:
```bash
mkdir -p uploads
npm run db:migrate
```

Start backend server:
```bash
npm run dev
```

### 5. Setup Frontend

Open another terminal (Terminal → New Terminal):
```bash
cd Frontend
npm install
npm run dev
```

### 6. View Your Website
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## VS Code Tips

### Running Both Servers
1. Use VS Code's integrated terminal
2. Split terminal: Click the split icon (or `Cmd+\` on Mac, `Ctrl+\` on Windows)
3. Run backend in one terminal, frontend in the other

### Recommended VS Code Extensions
- **ES7+ React/Redux/React-Native snippets** - React code snippets
- **Prettier - Code formatter** - Auto-format code
- **PostgreSQL** - Database management
- **Thunder Client** or **REST Client** - Test API endpoints

### Debugging
- Use the debugger: Press `F5` or go to Run → Start Debugging
- The launch configuration is already set up for the backend

## Adding Sample Data

You can add products via the API. Use Thunder Client or curl:

```bash
curl -X POST http://localhost:5000/api/products \
  -F "name=Vanilla Dream Candle" \
  -F "description=A soothing vanilla scented candle perfect for relaxation" \
  -F "price=24.99" \
  -F "category_id=3" \
  -F "stock_quantity=50" \
  -F "scent=Vanilla" \
  -F "size=Large" \
  -F "image=@/path/to/your/image.jpg"
```

## Troubleshooting

### Database Connection Error
- Make sure PostgreSQL is running: `brew services list` (Mac) or check Services (Windows)
- Verify credentials in `.env` file
- Test connection: `psql -U your_username -d candle_store`

### Port Already in Use
- Backend: Change `PORT` in `.env` file
- Frontend: Change port in `vite.config.js`

### Images Not Showing
- Make sure `uploads` directory exists in Backend folder
- Check that image path in database starts with `/uploads/`

## Next Steps
1. Add your candle product images to the `Backend/uploads` folder
2. Create products via API or add them directly to the database
3. Customize the styling in the CSS files
4. Add more features like shopping cart, user authentication, etc.




