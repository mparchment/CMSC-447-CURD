import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

function DeleteUser() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

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

  function handleDelete() {
    selectedUsers.forEach(async (userId) => {
      try {
        await axios.delete(`/users/${userId}`);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      } catch (error) {
        console.log(error);
      }
    });
    setSelectedUsers([]);
  }

  function handleCheckboxChange(event) {
    const { id, checked } = event.target;
    if (checked) {
      setSelectedUsers((prevSelected) => [...prevSelected, parseInt(id)]);
    } else {
      setSelectedUsers((prevSelected) =>
        prevSelected.filter((userId) => userId !== parseInt(id))
      );
    }
  }

  return (
    <div className="usersTableContainer">
      <h2>Delete Users</h2>
      <div className="delete-container">
        <button className="delete-button" onClick={handleDelete}>Delete Selected Users</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>ID</th>
            <th>Name</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <input
                  type="checkbox"
                  id={user.id}
                  checked={selectedUsers.includes(user.id)}
                  onChange={handleCheckboxChange}
                />
              </td>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DeleteUser;
