import React, { useState } from 'react';

function PrinciplesForm() {
  const [principle, setprinciple] = useState('');
  const [principles, setprinciples] = useState([]);

  const handleChange = (event) => {
    setprinciple(event.target.value);
  };

  const handleAddprinciple = () => {
    if (principle.trim() !== '') {
      setprinciples([...principles, principle]);
      setprinciple('');
    }
  };

  return (
    <div className="principle-form">
      <div>
        <label>supplier/Principle:</label>
        <input type="text" value={principle} onChange={handleChange} placeholder="Please enter principle" />
        <button onClick={handleAddprinciple}>Add</button>
      </div>

    </div>
  );
}

export default PrinciplesForm;