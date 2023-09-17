import React, { createContext, useContext, useState } from 'react';

// Create a context
const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [tasksName, setTasksName] = useState("All");


  return (
    <TaskContext.Provider value={{ categories, setCategories, tasks, setTasks, tasksName, setTasksName }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  return useContext(TaskContext);
};

export default TaskProvider;