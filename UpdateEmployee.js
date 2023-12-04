import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateEmployee = ({ match }) => {
  const [employeeData, setEmployeeData] = useState({
    name: '',
    position: '',
    // Add other employee fields as needed
  });

  useEffect(() => {
    // Fetch employee details from the backend API using the employee ID from the URL
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/employees/${match.params.id}`);
        setEmployeeData(response.data);
      } catch (error) {
        console.error('Error fetching employee details:', error.message);
      }
    };

    fetchEmployee();
  }, [match.params.id]);

  const handleChange = (e) => {
    setEmployeeData({
      ...employeeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an API call to update employee details
      const response = await axios.put(
        `http://localhost:3001/employees/${match.params.id}`,
        employeeData
      );
      console.log('Employee updated successfully:', response.data);
      // Optionally, you can redirect or update the state after a successful update
    } catch (error) {
      console.error('Error updating employee details:', error.message);
    }
  };

  return (
    <div>
      <h2>Update Employee</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={employeeData.name || ''}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Position:
          <input
            type="text"
            name="position"
            value={employeeData.position || ''}
            onChange={handleChange}
          />
        </label>
        {/* Add other form fields as needed */}
        <br />
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
};

export default UpdateEmployee;

