import React, { useState } from 'react';
import axios from 'axios';

const AddEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    name: '',
    position: '',
    // Add other employee fields as needed
  });

  const handleChange = (e) => {
    setEmployeeData({
      ...employeeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an API call to add a new employee
      const response = await axios.post('http://localhost:3001/employees', employeeData);
      console.log('Employee added successfully:', response.data);
      // Optionally, you can redirect or update the state after a successful add
    } catch (error) {
      console.error('Error adding employee:', error.message);
    }
  };

  return (
    <div>
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        {/* Employee form fields */}
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
