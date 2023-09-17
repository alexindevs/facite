import React, { useEffect, useState } from 'react';
import { useSiteContext } from '../../SiteContext';
import { useNavigate } from 'react-router-dom';
import { decode } from 'jsonwebtoken';
import TaskHeader from './taskHeader';
import Categories from './Categories';
import Tasks from './Tasks';
import styles from './taskPage.module.css';

const TaskPage = () => {
    const { isLoggedIn, setIsLoggedIn } = useSiteContext();
  const { setUsername } = useSiteContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in and token is available
    if (isLoggedIn) {
      const token = localStorage.getItem('accessToken');

      // Decode the token to get the user information
      try {
        const decodedToken = decode(token);
        const { username } = decodedToken;
        setUsername(username);
      } catch (error) {
        console.error('Error decoding token:', error);
        setIsLoggedIn(false);
      }
    } else {
      navigate('/signin');
    }
  }, [isLoggedIn, setIsLoggedIn, setUsername, navigate]);

  return (
    <div className={styles.taskPage}>
      <TaskHeader />
      <Categories />
      <Tasks/>
    </div>
  )
}

export default TaskPage;