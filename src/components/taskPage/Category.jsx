import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Category.module.css";
import { useTaskContext } from "../../TaskContext";



const Category = (props) => {
  const { tasks } = useTaskContext();
  const [categoryCount, setCategoryCount] = useState(0);

  let id = 0;
  if (props.id !== undefined)
  {
   id = props.id;
  }

  useEffect(() => {
    const count = tasks.filter((task) => task.category_id === id).length;
    setCategoryCount(count);
  }, [tasks]);



  
  const handleDelete = () => {
    props.onDeleteCategory(id);
    };

   const handleClick = () => {
    props.onClick(id, props.name);
  }


  if (props.color !== "transparent") {
    return (
      <div className={styles.category} style={{ backgroundColor: props.color }} onClick={handleClick}>
        <p className={styles.category_name}>{props.name}</p>
        <span style={{ color: "white" }}>{categoryCount} tasks</span>
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={styles.delete_icon}
        onClick={handleDelete}
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>
    );
  } else {
    return (
      <div className={styles.category} style={{ boxShadow: "none", border: "1px solid rgb(137 137 137)" }} onClick={props.onClick}>
        <p className={styles.category_name} style={{ color: "rgb(137 137 137)" }}>
          {props.name} 
        </p>
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        stroke="rgb(137, 137, 137)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        >
  <line x1="12" y1="5" x2="12" y2="19" />
  <line x1="5" y1="12" x2="19" y2="12" />
</svg>

      </div>
    );
  }
};

// Fix the fetchTaskCount export, so you can call it when a task is added, prolly from Tasks

export default Category;