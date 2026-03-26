# Quick Start Guide

## Step 1: Install Dependencies
```bash
cd nodejs-backend
npm install
```

## Step 2: Set Up MySQL Database

### Create Database:
```bash
mysql -u root -p
```

In MySQL prompt:
```sql
CREATE DATABASE contact_form_db;
USE contact_form_db;
```

### Create Table:
```sql
CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message LONGTEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Step 3: Configure Environment
Edit `.env` file with your MySQL credentials:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=contact_form_db
DB_PORT=3306
PORT=5000
```

## Step 4: Start the Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server will run at: `http://localhost:5000`

## Step 5: Test the API

### Using cURL:
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Test",
    "message": "This is a test message"
  }'
```

### Using Postman:
1. Create new POST request
2. URL: `http://localhost:5000/api/contact`
3. Headers: `Content-Type: application/json`
4. Body (JSON):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "I would like to know more about your services"
}
```

## Troubleshooting

**MySQL Connection Error:**
- Verify MySQL is running
- Check credentials in `.env`
- Ensure database exists

**Port Already in Use:**
- Change `PORT` in `.env`
- Or kill process: `lsof -ti:5000 | xargs kill -9`

**Module Not Found:**
- Run `npm install` again
- Delete `node_modules` and run `npm install`
