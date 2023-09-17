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
  const {tasks, setTasks, tasksName} = useTaskContext();
  const [selectedTaskId, setSelectedTaskId] = useState(null);


  const handleTaskClick = (taskId) => {
    console.log(selectedTaskId)
    setSelectedTaskId(taskId);
    console.log(selectedTaskId)
    //Here, selectedTaskId is getting selected. I checked with these console.logs.
  };

  useEffect(() => {
    console.log(selectedTaskId);
  }, [selectedTaskId])

  const fetchAllTasks = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const decodedToken = jwt.decode(token);
      const userId = decodedToken.id;

      const response = await axios.get(`http://localhost:5000/api/tasks/${userId}`);
      const fetchedTasks = response.data.map(task => task);
      if (fetchedTasks) {
      console.log("Fetched Task date here:", fetchedTasks[0].due_date);
      setTasks(fetchedTasks);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const taskDeleteHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/deleteTask/${id}`)
      fetchAllTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
      
    }

  useEffect(() => {
    fetchAllTasks();
    console.log("All Tasks fetched!")
  }, [addTaskVisible]);

  const addTaskCloseHandler = () => {
    setAddTaskVisible(false);
  };

  return (
    <>
    <h1 className={styles.taskTitle}>{tasksName} Tasks</h1>
    <div className={styles.tasks}>
    {tasks.length > 0 ? (
  tasks.map(task => (
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
        //This line isn't working though. DisplayTask is not showing.
      )}
      <button className={styles.addTaskBtn} onClick={() => setAddTaskVisible(true)}>+</button>
    </div>
    </>
  );
};

export default Tasks;
