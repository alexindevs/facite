import React, { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import styles from './DisplayTask.module.css';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import AddTaskCategory from './AddTaskCategory';

const DisplayTask = ({ taskId, onClose }) => {
  const [taskData, setTaskData] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [editedFields, setEditedFields] = useState({});


  useEffect(() => {
    fetchTaskDetails();
  }, []);

  const fetchTaskDetails = async () => {
    try {
      // Fetch the task details using the task ID
      const response = await axios.get(`https://facite-backend.onrender.com/api/tasks/id/${taskId}`);
      const taskDetails = response.data;

      // Set the fetched task data
      setTaskData(taskDetails);
      console.log(taskDetails);
    } catch (error) {
      console.error('Error fetching task details:', error);
    }
  };

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Perform the update request to the server
      console.log(editedFields)
      await axios.put(`https://facite-backend.onrender.com/api/tasks/id/${taskId}`, editedFields);

      // After successful update, fetch updated task details
      fetchTaskDetails();
      setIsEditable(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  if (!taskData) {
    return <div>Loading...</div>;
  }

  const handleFieldChange = (fieldName, value) => {
    setEditedFields((prevEditedFields) => ({
      ...prevEditedFields,
      [fieldName]: value,
    }));
  };

  return (
    <div className={styles.displayTask}>
      <div className={styles.x_button} onClick={handleEdit}>
      <img width="32" height="32" src="https://img.icons8.com/windows/32/edit--v1.png" alt="edit--v1"/>
      </div>
      <div className={styles.inputs}>
      <input
        type="text"
        placeholder="Enter Task Name"
        className={styles.taskName}
        value={isEditable && editedFields.name !== undefined ? editedFields.name : taskData.name}
        readOnly={!isEditable}
        onChange={(e) => handleFieldChange('name', e.target.value)}
      />
      <textarea
        placeholder="Enter Task Description"
        className={styles.taskDescription}
        rows={3}
        value={isEditable && editedFields.description !== undefined ? editedFields.description : taskData.description}
        readOnly={!isEditable}
        onChange={(e) => handleFieldChange('description', e.target.value)}
      />
        <div className={styles.date}>
           <DatePicker
            selected={new Date(taskData.due_date * 1000)}
            value={new Date(taskData.due_date * 1000)}
            disabled={!isEditable}
            onChange={(date) => handleFieldChange('due_date', Math.floor(date.getTime() / 1000))}
            showTimeSelect
            dateFormat="Pp"
          />
        </div>
        <div className="categoryPicker">
        <AddTaskCategory
            name={taskData.Category.name}
            color={taskData.Category.color}
            onSelect={() => {alert("You can't perform this action.")}}
        />
        </div>

        {isEditable ? (
          <button className={styles.editButton} onClick={handleSubmit}>Save</button>
        ) : (
          <button className={styles.editButton} onClick={() => {onClose()}}>Close</button>
        )}
      </div>
    </div>
  );
}

export default DisplayTask;
