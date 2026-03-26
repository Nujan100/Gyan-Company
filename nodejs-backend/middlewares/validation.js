const validator = require('validator');

const validateContactForm = (req, res, next) => {
  const { name, email, subject, message } = req.body;

  // Check if all fields are present
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ 
      success: false,
      message: 'All fields (name, email, subject, message) are required' 
    });
  }

  // Validate name
  if (typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ 
      success: false,
      message: 'Name must be at least 2 characters long' 
    });
  }

  // Validate email
  if (!validator.isEmail(email)) {
    return res.status(400).json({ 
      success: false,
      message: 'Invalid email address' 
    });
  }

  // Validate subject
  if (typeof subject !== 'string' || subject.trim().length < 3) {
    return res.status(400).json({ 
      success: false,
      message: 'Subject must be at least 3 characters long' 
    });
  }

  // Validate message
  if (typeof message !== 'string' || message.trim().length < 10) {
    return res.status(400).json({ 
      success: false,
      message: 'Message must be at least 10 characters long' 
    });
  }

  // Sanitize inputs
  req.body.name = validator.trim(validator.escape(name));
  req.body.email = validator.trim(validator.normalizeEmail(email));
  req.body.subject = validator.trim(validator.escape(subject));
  req.body.message = validator.trim(validator.escape(message));

  next();
};

module.exports = { validateContactForm };
