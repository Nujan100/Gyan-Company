from flask import Flask, request, jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import mysql.connector
import os

# DB config
DB_NAME = 'gyan_contact_db'  # your database name
DB_USER = 'your_db_user'
DB_PASS = 'your_db_password'
DB_HOST = 'localhost'

app = Flask(__name__)

def setup_database():
    # Connect without selecting a DB to create one
    conn = mysql.connector.connect(user=DB_USER, password=DB_PASS, host=DB_HOST)
    cursor = conn.cursor()
    try:
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {DB_NAME}")
        print("Database checked/created.")
    except mysql.connector.Error as err:
        print(f"Error creating database: {err}")
    finally:
        cursor.close()
        conn.close()

    # Now connect to the created DB and create the table
    conn = mysql.connector.connect(user=DB_USER, password=DB_PASS, host=DB_HOST, database=DB_NAME)
    cursor = conn.cursor()
    table_query = """
        CREATE TABLE IF NOT EXISTS contact_messages (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255),
            company VARCHAR(255),
            service VARCHAR(255),
            message TEXT,
            submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """
    try:
        cursor.execute(table_query)
        print("Table checked/created.")
    except mysql.connector.Error as err:
        print(f"Error creating table: {err}")
    finally:
        cursor.close()
        conn.close()

# Call setup_database ONCE here:
setup_database()

@app.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    company = data.get('company')
    service = data.get('service')
    message = data.get('message')

    save_to_db(name, email, company, service, message)
    send_email(name, email, company, service, message)

    return jsonify({"message": "Form submitted successfully"}), 200

# rest of your code...
