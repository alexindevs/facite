import React, { useState } from "react";
import Backdrop from "../reusable/Backdrop";
import Button from "../reusable/Button"
import styles from "./AddCategory.module.css";

const colorOptions = [
  "#0000FF", // Blue
  "#00B3FF", // Light Blue
  "#BB00FF", // Purple
  "#00005A", // Dark Blue
  "#9600FF",
  "#1F00FE"
];


const AddCategory = ({ onAddCategory, onClose }) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryColor, setCategoryColor] = useState("#000000");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCategory = {
      name: categoryName,
      color: categoryColor,
    };
    onAddCategory(newCategory);
    setCategoryName("");
    setCategoryColor("#000000");
  };

  return (
    <>
    <Backdrop onClick={onClose} />
    <div className={styles.addCategory}>
      <h3>Add a Category</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Category Name</label>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
        />
        <label htmlFor="colorOptions">Choose a color</label>
        <div className={styles.colorOptions}>
          {colorOptions.map((color) => (
            <button
              key={color}
              type="button"
              className={styles.colorOption}
              style={{ backgroundColor: color }}
              onClick={() => setCategoryColor(color)}
            />
          ))}
        </div>
        <Button text="Add" importance="secondary"/>
      </form>
    </div>
    </>
  );
};

export default AddCategory;
