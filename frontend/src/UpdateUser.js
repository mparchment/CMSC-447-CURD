import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

function UpdateUser() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [name, setName] = useState('');
  const [points, setPoints] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  function handleSelectUser(event) {
    const userId = parseInt(event.target.value);
    const selectedUser = users.find((user) => user.id === userId);
    setSelectedUser(selectedUser);
    setName(selectedUser.name);
    setPoints(selectedUser.points);
  }

  async function handleUpdateUser(event) {
    event.preventDefault();
    try {
      await axios.put(`/users/${selectedUser.id}`, { name, points });
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === selectedUser.id ? { ...user, name, points } : user))
      );
      setSelectedUser(null);
      setName('');
      setPoints('');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="usersTableContainer">
      <h2>Update User</h2>
      <form onSubmit={handleUpdateUser}>
        <select value={selectedUser ? selectedUser.id : ''} onChange={handleSelectUser}>
          <option value="">-- Select User --</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {selectedUser && (
          <>
            <div>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
              <label htmlFor="points">Points:</label>
              <input type="number" id="points" value={points} onChange={(e) => setPoints(e.target.value)} />
            </div>
            <div><button className="button" type="submit">Update User</button></div>
          </>
        )}
      </form>
    </div>
  );
}

export default UpdateUser;
