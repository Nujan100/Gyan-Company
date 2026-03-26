# Backend Setup Instructions

## Issue Resolved ✓

The port 5000 conflict has been fixed by clearing background processes. Now follow these steps:

## 1. Set Up MySQL Database

### Option A: Using Terminal

```bash
mysql -u root -p < /Users/nujanshrestha/Desktop/Gyan-Company/nodejs-backend/database-setup.sql
```

### Option B: Manual Setup in MySQL

```bash
mysql -u root -p
```

Then copy and paste this entire SQL:

```sql
CREATE DATABASE IF NOT EXISTS contact_form_db;
USE contact_form_db;

CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message LONGTEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_created_at (created_at)
);
```

## 2. Verify `.env` File

Make sure your `.env` file has correct MySQL credentials:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=nujans123
DB_NAME=contact_form_db
DB_PORT=3306
PORT=5000
NODE_ENV=development
```

## 3. Install Dependencies (if not done)

```bash
cd /Users/nujanshrestha/Desktop/Gyan-Company/nodejs-backend
npm install
```

## 4. Start the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

**Expected Output:**
```
✓ MySQL Database connected successfully
🚀 Server running on http://localhost:5000
```

## 5. Test the API

### Test with cURL:

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Test Message",
    "message": "This is a test message from the contact form"
  }'
```

### Expected Response:
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "id": 1
}
```

### Get all contacts:
```bash
curl http://localhost:5000/api/contacts
```

### Health check:
```bash
curl http://localhost:5000/api/health
```

## Troubleshooting

### Port 5000 Still in Use?
```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### MySQL Connection Error?
- Verify MySQL is running: `brew services list`
- Check credentials in `.env` match your MySQL setup
- Run the database setup SQL again

### Dependencies Missing?
```bash
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

Once the server is running, integrate it with your frontend contact form by sending POST requests to `http://localhost:5000/api/contact`
