import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import styles from './Tasks.module.css';
import Task from './Task';
import AddTask from './AddTask';
import { useTaskContext } from '../../TaskContext';
import DisplayTask from './DisplayTask';

const Tasks = () => {
  const [addTaskVisible, setAddTaskVisible] = useState(false);
  const { tasks, setTasks, tasksName } = useTaskContext();
  const [visibleTasks, setVisibleTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const handleTaskClick = (taskId) => {
    setSelectedTaskId(taskId);
  };

  useEffect(() => {
    console.log(selectedTaskId);
  }, [selectedTaskId]);

  const fetchAllTasks = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const decodedToken = jwt.decode(token);
      const userId = decodedToken.id;

      const response = await axios.get(`https://facite-backend.onrender.com/api/tasks/${userId}`);
      const fetchedTasks = response.data.map(task => task);
      if (fetchedTasks) {
        console.log("Fetched Task date here:", fetchedTasks[0].due_date);
        setTasks(fetchedTasks);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const updateVisibleTasks = (categoryId = selectedCategoryId) => {
    const updatedVisibleTasks = categoryId
      ? tasks.filter(task => task.category_id === categoryId)
      : tasks;
    setVisibleTasks(updatedVisibleTasks);
  };

  const taskDeleteHandler = async (id) => {
    try {
      await axios.delete(`https://facite-backend.onrender.com/api/tasks/deleteTask/${id}`);
      fetchAllTasks();
      updateVisibleTasks(selectedCategoryId); // Pass the selected category ID
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  useEffect(() => {
    fetchAllTasks();
    updateVisibleTasks(); // Initial update of visible tasks
    console.log("All Tasks fetched!");
  }, [addTaskVisible]);

  const addTaskCloseHandler = () => {
    setAddTaskVisible(false);
    updateVisibleTasks(); // Update visible tasks when a task is added
  };

  return (
    <>
      <h1 className={styles.taskTitle}>{tasksName} Tasks</h1>
      <div className={styles.tasks}>
        {visibleTasks.length > 0 ? (
          visibleTasks.map(task => (
            <Task
              key={task.id}
              id={task.id}
              name={task.name}
              category_id={task.category_id}
              date={task.due_date}
              status={task.status}
              onDelete={taskDeleteHandler}
              onTaskClick={handleTaskClick}
            />
          ))
        ) : (
          <p>You have nothing to do!</p>
        )}
        {addTaskVisible && <AddTask onClose={addTaskCloseHandler} />}
        {selectedTaskId && (
          <DisplayTask taskId={selectedTaskId} onClose={() => setSelectedTaskId(null)} />
          // This line should work now. DisplayTask should show correctly.
        )}
        <button className={styles.addTaskBtn} onClick={() => setAddTaskVisible(true)}>+</button>
      </div>
    </>
  );
};

export default Tasks;
