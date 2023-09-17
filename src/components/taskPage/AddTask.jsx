import React, { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import styles from './AddTask.module.css';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { fetchTaskCount } from './Category'
import { useTaskContext } from '../../TaskContext';
import AddTaskCategory from './AddTaskCategory';

const AddTask = (props) => {
  const [dueDate, setDueDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [categories, setCategories] = useState([
    { id: 1, name: "you don't have any categories!", color: "red"},
  ]);  

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  }

  useEffect(() => {
    console.log(Math.floor(dueDate.getTime() / 1000));
  }, [dueDate])

  const submitHandler = async (e) => {
    e.preventDefault();
  
    const newTask = {
      name: taskName,
      description: taskDescription,
      category_id: selectedCategory,
      due_date: Math.floor(dueDate.getTime() / 1000),
      status: "pending"
    };
    console.log(newTask.due_date);
    try {
      const response = await axios.post("https://facite-backend.onrender.com/api/tasks/AddTask", newTask);
      const addedTask = response.data;
  
      console.log("Task added:", addedTask);
      props.onClose();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  
  const fetchCategories = async () => {
    try {
   // Get the JWT token from local storage
   const token = localStorage.getItem("accessToken");
  
   // Decode the JWT token to get the user ID
   const decodedToken = jwt.decode(token);
   const userId = decodedToken.id;

   // Fetch categories using the user ID
   const response = await axios.get(`https://facite-backend.onrender.com/api/categories/${userId}`);

   // Transform the response data into an array of objects
   const categoriesArray = response.data.map((category) => ({
     id: category.id, // Assuming the backend sends the category ID as 'id'
     name: category.name,
     color: category.color,
   }));

   setCategories(categoriesArray);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [])

  return (
    <div className={styles.addTask}>
      <div className={styles.x_button} onClick={props.onClose}>
      <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" className={styles.taskDeleteIcon}>
        <line x1="10" y1="10" x2="30" y2="30" stroke="gray" strokeWidth="3" />
        <line x1="30" y1="10" x2="10" y2="30" stroke="gray" strokeWidth="3" />
      </svg>
      </div>
      <div className={styles.inputs}>
        <input
          type="text"
          placeholder="Enter Task Name"
          className={styles.taskName}
          autoFocus
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <textarea
          placeholder="Enter Task Description"
          className={styles.taskDescription}
          rows={3}
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <div className={styles.date}>
          <DatePicker
            selected={dueDate}
            value={dueDate}
            fullScreenMode={true}
            onChange={(date) => setDueDate(date)}
            showTimeSelect
            dateFormat="Pp"
          />
        </div>
        <div className="categoryPicker">

          {categories.map((category) => (
            <AddTaskCategory key={category.id} id={category.id} name={category.name} color={category.color} onSelect={handleCategorySelect} />
          ))}
        </div>

        <button className={styles.addTaskButton} type="submit" onClick={submitHandler}>Add</button>
      </div>
    </div>
  )
}

export default AddTask;
