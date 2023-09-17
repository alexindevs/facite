import React, { useState, useEffect } from 'react';
import styles from './Task.module.css';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const Task = (props) => {
  const [accentColor, setAccentColor] = useState('#000000'); // Default color if category color is not found
  const [status, setStatus] = useState("pending");

  // Function to calculate the hasPassed flag and update the accentColor
  const updateColorAndPassedStatus = () => {
    let today = new Date();
    today = Math.floor(today.getTime() / 1000);
    console.log("Today:", today);
    const taskDate = props.date;
    console.log("Task Date:", taskDate);
    const hasPassed = taskDate <= today;
    if (hasPassed) {
      setAccentColor("#FF0000");
    }
  };


  useEffect(() => {
    const fetchCategoryColor = async () => {
      try {
        const token = localStorage.getItem("accessToken");
  
        // Decode the JWT token to get the user ID
        const decodedToken = jwt.decode(token);
        const userId = decodedToken.id;
    
        // Fetch categories using the user ID
        const response = await axios.get(`http://localhost:5000/api/categories/${userId}`);
        const category = response.data.find((cat) => cat.id === parseInt(props.category_id));
        if (category) {
          setAccentColor(category.color);
          updateColorAndPassedStatus();
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategoryColor();
  }, [props.category_id]);

  const deleteHandler = () => {
      props.onDelete(parseInt(props.id));
  }
      
  const toggleStatus = async () => {
    const newStatus = status === "pending" ? "completed" : "pending";
  
    try {
      await axios.post('http://localhost:5000/api/tasks/updateStatus', {
        taskId: props.id, // Change this to the actual task ID
        status: newStatus,
      });
  
      setStatus(newStatus);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleTaskClick = () => {
    props.onTaskClick(props.id); // Call the function with the task ID
  };


  return (
<div className={`${styles.task} ${status == "completed" ? styles.completed : ""}`} style={{borderBottomColor: status == "completed" ? "gray" : accentColor}}>
      <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg"  onClick={toggleStatus}>
        <circle
          cx="20"
          cy="20"
          r="12"
          stroke={status == "completed" ? "gray" : accentColor}
          strokeWidth="2"
          fill={status == "completed" ? "gray" :  "none"}
          className="filled"
        />
        <path
          className="tick-icon"
          fill="none"
          stroke="white"
          strokeWidth="3"
          d="M15 20 L19 24 L25 18"
        />
      </svg>
      <p className={styles.taskName} onClick={handleTaskClick}>{props.name}</p>
      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" className={styles.taskDeleteIcon} onClick={deleteHandler}>
        <line x1="5" y1="5" x2="15" y2="15" stroke="gray" strokeWidth="2" />
        <line x1="15" y1="5" x2="5" y2="15" stroke="gray" strokeWidth="2" />
      </svg>

    </div>
  );
};

export default Task;
