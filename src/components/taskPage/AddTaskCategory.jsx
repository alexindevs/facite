import React from "react";

const AddTaskCategory = (props) => {
  const onAddTaskCategoryHandler = () => {
    // Call the onSelect prop with the id when the category is selected
    props.onSelect(props.id);
  };

  return (
    <div
      style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
      onClick={onAddTaskCategoryHandler}
    >
      <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="12" fill={props.color} />
      </svg>
      <span style={{ marginLeft: "10px", paddingTop: "0px" }}>{props.name}</span><br />
    </div>
  );
};

export default AddTaskCategory;
