import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

function CreateUser() {
  const [name, setName] = useState('');
  const [points, setPoints] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newUser = { name, points };
    try {
      await axios.post('/users', newUser, {
        headers: { 'Content-Type': 'application/json' }
      });
      alert('New user created successfully');
      setName('');
      setPoints('');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="createUserContainer">
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <div className="createUserInput">
          <label className="createUserInputLabel">
            Name
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="createUserInputField" />
          </label>
        </div>
        <div className="createUserInput">
          <label className="createUserInputLabel">
            Points
            <input type="text" value={points} onChange={(e) => setPoints(e.target.value)} className="createUserInputField" />
          </label>
        </div>
        <div>
          <button type="submit" className="createUserButton">
            Add User
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateUser;
