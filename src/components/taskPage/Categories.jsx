import React, { useState, useEffect } from "react";
import Category from "./Category";
import AddCategory from "./AddCategory";
import styles from "./categories.module.css";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useTaskContext } from "../../TaskContext";



const Categories = () => {
  const {categories, setCategories, tasks, setTasks, setTasksName} = useTaskContext();
  const [showAddCategory, setShowAddCategory] = useState(false);

  useEffect(() => {
    console.log("Categories Fetched!")
    fetchCategories();
  }, []);

  

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
      console.error("Error fetching categories:", error);
    }
  };
  
  const handleCategoryClick = async (categoryId, categoryName) => {
    try {
      // Fetch tasks associated with the selected category
      const response = await axios.get(`https://facite-backend.onrender.com/api/tasks/category/${categoryId}`);

      // Update the tasks state with fetched tasks
      setTasks(response.data);
      setTasksName(categoryName);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddCategory = async (newCategory) => {
    try {
      const token = localStorage.getItem("accessToken");
      const decodedToken = jwt.decode(token);
      const user_Id = decodedToken.id;

      // Create a new category object with user_id and other details
      const categoryData = {
        ...newCategory,
        userId: user_Id,
      };

      // Make a POST request to the server to add the category
      await axios.post("https://facite-backend.onrender.com/api/categories/AddCategory", categoryData);

      // After adding the category, fetch the updated categories
      fetchCategories();
      setShowAddCategory(false);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`https://facite-backend.onrender.com/api/categories/DeleteCategory/${categoryId}`);  
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  
  return (
    <div>
      <h3 className={styles.categoriesTitle}>Categories</h3>
      <div className={styles.categories}>
        {categories.map((category) => (
          <Category
            key={category.id}
            id={category.id}
            name={category.name}
            color={category.color}
            onClick={handleCategoryClick}
            onDeleteCategory={handleDeleteCategory}
          />
        ))}
        <Category
          key="addCategory"
          name="Add a category"
          color="transparent"
          onClick={() => setShowAddCategory(true)}
        />
        {showAddCategory && <AddCategory onAddCategory={handleAddCategory} />}
      </div>
    </div>
  );
};

export default Categories;
