import { useState } from 'react';
import './styles.css'

import CreateUser from './CreateUser'
import DeleteUser from './DeleteUser'
import UpdateUser from './UpdateUser'
import SearchUser from './SearchUser'

function App() {
  const [selectedButton, setSelectedButton] = useState('search');

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <div className="page-container">
      <div className="container">
        <div className="button-container">
          <button className="button" onClick={() => handleButtonClick('create')}>Create</button>
          <button className="button" onClick={() => handleButtonClick('search')}>Search</button>
          <button className="button" onClick={() => handleButtonClick('delete')}>Delete</button>
          <button className="button" onClick={() => handleButtonClick('update')}>Update</button>
        </div>
      </div>
      {selectedButton === 'create' && <CreateUser />}
      {selectedButton === 'search' && <SearchUser />}
      {selectedButton === 'delete' && <DeleteUser />}
      {selectedButton === 'update' && <UpdateUser />}
    </div>
  );
}

export default App;