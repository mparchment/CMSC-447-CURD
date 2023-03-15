from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__, static_folder=os.path.abspath('frontend/build'))
CORS(app)

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

@app.route('/users', methods=['POST'])
def create_user():
    conn = sqlite3.connect('appdb.db')
    new_user = request.get_json()
    name = new_user['name']
    points = new_user['points']
    conn.execute("INSERT INTO users (name, points) VALUES (?, ?)", (name, points))
    conn.commit()
    return jsonify({'message': 'New user created successfully'})

@app.route('/users', methods=['GET'])
def get_users():
    conn = sqlite3.connect('appdb.db')
    cursor = conn.execute("SELECT * FROM users")
    users = []
    for row in cursor:
        user = {'id': row[0], 'name': row[1], 'points': row[2]}
        users.append(user)
    return jsonify(users)

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    conn = sqlite3.connect('appdb.db')
    cursor = conn.execute("SELECT * FROM users WHERE id=?", (user_id,))
    row = cursor.fetchone()
    if row is None:
        return jsonify({'message': 'User not found'})
    else:
        user = {'id': row[0], 'name': row[1], 'points': row[2]}
        return jsonify(user)

@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    conn = sqlite3.connect('appdb.db')
    updated_user = request.get_json()
    name = updated_user['name']
    points = updated_user['points']
    conn.execute("UPDATE users SET name=?, points=? WHERE id=?", (name, points, user_id))
    conn.commit()
    return jsonify({'message': 'User updated successfully'})

@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    conn = sqlite3.connect('appdb.db')
    cursor = conn.cursor()
    cursor.execute("DELETE FROM users WHERE id=?", (user_id,))
    conn.commit()
    return jsonify({'message': 'User deleted successfully'})
