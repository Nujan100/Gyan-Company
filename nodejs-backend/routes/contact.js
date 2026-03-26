const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { validateContactForm } = require('../middlewares/validation');

// POST: Submit a new contact form
router.post('/contact', validateContactForm, async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const connection = await db.getConnection();

    const query = 'INSERT INTO contacts (name, email, subject, message, created_at) VALUES (?, ?, ?, ?, NOW())';
    const [result] = await connection.execute(query, [name, email, subject, message]);

    connection.release();

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      id: result.insertId
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting contact form',
      error: error.message
    });
  }
});

// GET: Retrieve all contact forms (admin only)
router.get('/contacts', async (req, res) => {
  try {
    const connection = await db.getConnection();

    const query = 'SELECT * FROM contacts ORDER BY created_at DESC';
    const [rows] = await connection.execute(query);

    connection.release();

    res.status(200).json({
      success: true,
      data: rows,
      count: rows.length
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving contacts',
      error: error.message
    });
  }
});

// GET: Retrieve a specific contact form by ID
router.get('/contact/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await db.getConnection();

    const query = 'SELECT * FROM contacts WHERE id = ?';
    const [rows] = await connection.execute(query, [id]);

    connection.release();

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving contact',
      error: error.message
    });
  }
});

// DELETE: Delete a contact form by ID
router.delete('/contact/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await db.getConnection();

    const query = 'DELETE FROM contacts WHERE id = ?';
    const [result] = await connection.execute(query, [id]);

    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting contact',
      error: error.message
    });
  }
});

module.exports = router;
