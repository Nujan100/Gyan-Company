# Frontend-Backend Integration Guide

## ✅ Setup Complete!

Your contact form is now fully integrated with the Node.js backend. Here's what was done:

## 📋 What Changed

### 1. **JavaScript Handler Created**
   - **File:** `assets/js/contact-form.js`
   - **Purpose:** Handles form submission and communicates with backend API
   - **Features:**
     - Form validation (client-side)
     - Error handling and user feedback
     - Success messages with auto-reset
     - Loading states during submission

### 2. **HTML Form Updated**
   - **File:** `index.html`
   - **Updated:**
     - Added `name` attributes to all form fields
     - Added required field indicators (`*`)
     - Added `required` attribute for validation
     - Included the new JavaScript handler
     - Fixed select options to have proper values

### 3. **Form Fields Mapping**
```
Frontend Field      Backend Field    Backend Requirement
─────────────────   ─────────────    ──────────────────
name                name             Required
email               email            Required
service + company   subject          Required
message             message          Required (min 10 chars)
```

## 🚀 How to Use

### Step 1: Start the Backend Server
```bash
cd /Users/nujanshrestha/Desktop/Gyan-Company/nodejs-backend
npm run dev
# or
node server.js
```

**Expected Output:**
```
✓ MySQL Database connected successfully
🚀 Server running on http://localhost:3002
```

### Step 2: Open the Frontend in Browser
```
Open: http://localhost/index.html
or: file:///Users/nujanshrestha/Desktop/Gyan-Company/index.html
```

### Step 3: Test the Contact Form
1. Fill out all required fields:
   - Full Name
   - Email Address
   - Message
2. Optionally fill:
   - Company
   - Service of Interest
3. Click "Send Message"

### Step 4: Verify Data Was Saved
Check the database to see if the contact was saved:
```bash
mysql -u root -p contact_form_db
SELECT * FROM contacts;
```

## 📊 API Endpoint Reference

### Submit Contact Form
```
POST http://localhost:3002/api/contact
Content-Type: application/json

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Statutory Auditing - ABC Corporation",
  "message": "I would like to schedule a consultation..."
}

Response:
{
  "success": true,
  "message": "Contact form submitted successfully",
  "id": 1
}
```

## 🔍 Troubleshooting

### Issue: "Unable to connect to the server"
**Solution:** 
- Verify backend is running on port 3002
- Check `.env` file has `PORT=3002`
- Run: `ps aux | grep node` to confirm server is running

### Issue: Form doesn't submit
**Solution:**
- Check browser console (F12 > Console tab) for errors
- Verify all required fields are filled
- Check CORS is enabled in backend (it is by default)

### Issue: Database not showing contacts
**Solution:**
- Verify MySQL is running: `brew services list`
- Check database was created: `mysql -u root -p contact_form_db`
- Verify table exists: `SHOW TABLES;`

### Issue: CORS Error
**Solution:** Already handled! Backend has CORS enabled by default.
However, if accessing from different domain:
- Update backend `cors()` configuration
- Or use a proxy

## 🛠️ Backend Management

### View All Contacts
```bash
curl http://localhost:3002/api/contacts
```

### View Single Contact
```bash
curl http://localhost:3002/api/contact/1
```

### Delete a Contact
```bash
curl -X DELETE http://localhost:3002/api/contact/1
```

### Health Check
```bash
curl http://localhost:3002/api/health
```

## 📝 Form Elements

### Field Validation Rules
- **Name:** Min 2 characters, required
- **Email:** Valid email format, required
- **Message:** Min 10 characters, required
- **Service:** Optional (shows in subject field)
- **Company:** Optional (shows in subject field)

### User Feedback
1. **Error Alert:** Red banner appears with error message (auto-closes in 5s)
2. **Success Alert:** Green banner appears with success message (auto-closes in 6s)
3. **Loading State:** Button shows "Sending..." with loading spinner
4. **Form Reset:** Form clears automatically after successful submission

## 🔐 Security Features

- **Input Sanitization:** All inputs are trimmed and escaped (backend)
- **Email Validation:** Both client-side and server-side
- **Length Validation:** Minimum character requirements enforced
- **SQL Injection Prevention:** Using parameterized queries
- **XSS Prevention:** HTML entities are escaped

## 📱 Responsive Design

The form is fully responsive:
- **Desktop:** Full-width form with contact info sidebar
- **Tablet:** Stacked layout
- **Mobile:** Optimized single column layout

## 🎨 Customization

### Change Backend Port
Edit `nodejs-backend/.env`:
```
PORT=3002  # Change this to desired port
```

Then update `contact-form.js`:
```javascript
const response = await fetch('http://localhost:3002/api/contact', {
```

### Change Success Message
Edit `assets/js/contact-form.js`, function `handleContactFormSubmit`:
```javascript
showSuccess('Your custom message here!');
```

### Change Alert Styles
Edit the CSS classes in `contact-form.js`:
- `.bg-red-500` - Change error alert color
- `.bg-green-500` - Change success alert color

## 📞 Contact Information

**Stored in Database:**
- Name
- Email
- Subject (Service + Company combined)
- Message
- Created At (Timestamp)

**Recipients (Email):**
All messages go to the database. To send emails:
1. Install `nodemailer` package
2. Add email service configuration
3. Update backend routes to send emails

## ✨ Next Steps

1. ✅ Form is connected and working
2. 📧 (Optional) Add email notifications to backend
3. 📊 (Optional) Create admin dashboard to view messages
4. 🔔 (Optional) Add email field validation with confirmation
5. 📱 (Optional) Add phone field to contact form

---

**Need Help?**
- Check backend logs: `npm run dev`
- Check browser console: F12 → Console
- Review API response in Network tab: F12 → Network
