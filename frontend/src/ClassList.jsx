// src/components/ClassList.js
import React, { useEffect, useState } from 'react';
import { getClasses } from './api'; // Adjusted the path

const ClassList = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const classesData = await getClasses();
        setClasses(classesData);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div>
      <h1>Classes</h1>
      <ul>
        {classes.map((cls) => (
          <li key={cls._id}>{cls.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ClassList;
