import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewEmployee = ({ match }) => {
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    // Fetch employee details from the backend API using the employee ID from the URL
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/employees/${match.params.id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee details:', error.message);
      }
    };

    fetchEmployee();
  }, [match.params.id]);

  return (
    <div>
      <h2>Employee Details</h2>
      <p>Name: {employee.name}</p>
      <p>Position: {employee.position}</p>
      {/* Display other employee details as needed */}
    </div>
  );
};

export default ViewEmployee;
