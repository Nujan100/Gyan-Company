const db = require('../config/db');

// Controller for submitting contact form
const submitContact = async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const connection = await db.getConnection();

    const query = 'INSERT INTO contacts (name, email, subject, message, created_at) VALUES (?, ?, ?, ?, NOW())';
    const [result] = await connection.execute(query, [name, email, subject, message]);

    connection.release();

    return {
      success: true,
      message: 'Contact form submitted successfully',
      id: result.insertId
    };
  } catch (error) {
    console.error('Database error:', error);
    throw new Error(error.message);
  }
};

// Controller for getting all contacts
const getAllContacts = async () => {
  try {
    const connection = await db.getConnection();

    const query = 'SELECT * FROM contacts ORDER BY created_at DESC';
    const [rows] = await connection.execute(query);

    connection.release();

    return {
      success: true,
      data: rows,
      count: rows.length
    };
  } catch (error) {
    console.error('Database error:', error);
    throw new Error(error.message);
  }
};

// Controller for getting single contact
const getContactById = async (id) => {
  try {
    const connection = await db.getConnection();

    const query = 'SELECT * FROM contacts WHERE id = ?';
    const [rows] = await connection.execute(query, [id]);

    connection.release();

    if (rows.length === 0) {
      throw new Error('Contact not found');
    }

    return {
      success: true,
      data: rows[0]
    };
  } catch (error) {
    console.error('Database error:', error);
    throw new Error(error.message);
  }
};

// Controller for deleting contact
const deleteContact = async (id) => {
  try {
    const connection = await db.getConnection();

    const query = 'DELETE FROM contacts WHERE id = ?';
    const [result] = await connection.execute(query, [id]);

    connection.release();

    if (result.affectedRows === 0) {
      throw new Error('Contact not found');
    }

    return {
      success: true,
      message: 'Contact deleted successfully'
    };
  } catch (error) {
    console.error('Database error:', error);
    throw new Error(error.message);
  }
};

module.exports = {
  submitContact,
  getAllContacts,
  getContactById,
  deleteContact
};
