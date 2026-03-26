# Contact Form Backend - Node.js + Express + MySQL

A simple backend API for a contact form built with Node.js, Express.js, and MySQL.

## Project Structure

```
nodejs-backend/
├── config/
│   └── db.js                 # MySQL connection configuration
├── middlewares/
│   └── validation.js         # Input validation middleware
├── routes/
│   └── contact.js            # Contact form API endpoints
├── .env                      # Environment variables (create from .env.example)
├── .env.example              # Example environment variables
├── package.json              # Project dependencies
├── server.js                 # Main Express application
└── README.md                 # This file
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MySQL Server (v5.7 or higher)

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create MySQL Database:**
   ```sql
   CREATE DATABASE contact_form_db;
   ```

3. **Create the contacts table:**
   ```sql
   USE contact_form_db;
   
   CREATE TABLE contacts (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL,
     subject VARCHAR(255) NOT NULL,
     message LONGTEXT NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

4. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Update the database credentials in `.env`:
     ```
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=nujans123
     DB_NAME=contact_form_db
     DB_PORT=3306
     PORT=5000
     ```

## Running the Server

### Development (with auto-reload):
```bash
npm run dev
```

### Production:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### 1. **Submit Contact Form**
- **URL:** `POST /api/contact`
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Inquiry",
    "message": "I would like to discuss..."
  }
  ```
- **Success Response (201):**
  ```json
  {
    "success": true,
    "message": "Contact form submitted successfully",
    "id": 1
  }
  ```

### 2. **Get All Contacts**
- **URL:** `GET /api/contacts`
- **Response (200):**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "subject": "Inquiry",
        "message": "I would like to discuss...",
        "created_at": "2024-01-15T10:30:00.000Z"
      }
    ],
    "count": 1
  }
  ```

### 3. **Get Single Contact**
- **URL:** `GET /api/contact/:id`
- **Response (200):**
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "subject": "Inquiry",
      "message": "I would like to discuss...",
      "created_at": "2024-01-15T10:30:00.000Z"
    }
  }
  ```

### 4. **Delete Contact**
- **URL:** `DELETE /api/contact/:id`
- **Response (200):**
  ```json
  {
    "success": true,
    "message": "Contact deleted successfully"
  }
  ```

### 5. **Health Check**
- **URL:** `GET /api/health`
- **Response (200):**
  ```json
  {
    "message": "Backend is running",
    "status": "OK"
  }
  ```

## Validation Rules

The contact form has the following validation rules:
- **Name:** Required, minimum 2 characters
- **Email:** Required, must be valid email format
- **Subject:** Required, minimum 3 characters
- **Message:** Required, minimum 10 characters

All inputs are sanitized to prevent XSS attacks.

## Frontend Integration Example

```javascript
// Submit contact form from frontend
async function submitContactForm(formData) {
  try {
    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('Form submitted successfully:', result.id);
    } else {
      console.error('Error:', result.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Usage
submitContactForm({
  name: 'John Doe',
  email: 'john@example.com',
  subject: 'Hello',
  message: 'This is a test message from the contact form'
});
```

## Environment Variables

- `DB_HOST` - MySQL host (default: localhost)
- `DB_USER` - MySQL username (default: root)
- `DB_PASSWORD` - MySQL password
- `DB_NAME` - Database name (default: contact_form_db)
- `DB_PORT` - MySQL port (default: 3306)
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

## Dependencies

- **express** - Web framework
- **mysql2** - MySQL driver for Node.js
- **dotenv** - Environment variable management
- **cors** - Cross-Origin Resource Sharing middleware
- **body-parser** - Request body parsing middleware
- **validator** - Input validation and sanitization
- **nodemon** (dev) - Auto-reload development server

## License

ISC
