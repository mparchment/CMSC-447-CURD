from flask import Flask, request, jsonify, send_from_directory
import sqlite3 # Import SQLite3 to be used as the database.
import os # Import os library to be able to deploy the frontend.

app = Flask(__name__, static_folder=os.path.abspath('frontend/build'))

# Home page of the CURD app -- uses the static frontend generated with npm build.
@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

@app.route('/users', methods=['POST'])
def create_user():
    # Create route of app ...
    # First, connect to database:
    database = sqlite3.databaseect('appdb.db')
    # Get JSON data from frontend:
    new_user = request.get_json()
    # Extract new user name from JSON:
    name = new_user['name']
    # Extract new user points from JSON:
    points = new_user['points']
    # Run SQLite3 command to insert new entry into database:
    database.execute("INSERT INTO users (name, points) VALUES (?, ?)", (name, points))
    # Save all changes to the database with the commit() function called on the database.
    database.commit()
    # Close database connection for security:
    database.close()
    # Return message communicating successful create:
    return jsonify({'message': 'New user created successfully'})

@app.route('/users', methods=['GET'])
def get_users():
    # Read route of the app ...
    # Connect to the database:
    database = sqlite3.databaseect('appdb.db')
    # Run SQLite3 command with execute() to read all users stored in the table,
    # Then call fetchall() to convert selected users into a list.
    users = database.execute("SELECT * FROM users").fetchall()
    # Close database connection for security:
    database.close()
    # Return all users currently stored in the database as JSON to the frontend:
    return jsonify(users)

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    # Read route for a single user ...
    # Connect to the database:
    database = sqlite3.databaseect('appdb.db')
    user = database.execute("SELECT * FROM users WHERE id=?", (user_id,)).fetchone()
    # Check if user does not exist in the database:
    if user is None:
        # Communicate that user has not been found:
        return jsonify({'message': 'User not found'})
    # Place user info in JSON format to be returned:
    user_info = {'id': user[0], 'name': user[1], 'points': user[2]}
    # Return user with the given ID from the database:
    return jsonify(user_info)

@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    # Update route for a single user ...
    database = sqlite3.databaseect('appdb.db')
    # Get JSON data from the frontend:
    updated_user = request.get_json()
    # Extract new name of user:
    name = updated_user['name']
    # Extract new points of user:
    points = updated_user['points']
    # Run SQLite3 command with execute() to update user with the matching ID:
    database.execute("UPDATE users SET name=?, points=? WHERE id=?", (name, points, user_id))
    # Save changes in the database with commit():
    database.commit()
    # Communicate to the frontend that user has been successfully updated:
    return jsonify({'message': 'User updated successfully'})

@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    # Delete route for a single user ...
    database = sqlite3.databaseect('appdb.db')
    # Create cursor for the database to execute command:
    database_cmd = database.cursor()
    # Run SQLite3 command on the database to delete user with matching ID:
    database_cmd.execute("DELETE FROM users WHERE id=?", (user_id,))
    # Save changes in the database with commit:
    database.commit()
    # Communicate to the frontend that the user has been successfully deleted:
    return jsonify({'message': 'User deleted successfully'})
