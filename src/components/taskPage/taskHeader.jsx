import { useState } from 'react';
import styles from './taskHeader.module.css';
import Navbar from '../reusable/Navbar';
import { useSiteContext } from '../../SiteContext';

const TaskHeader = () => {
  const {username, setUsername} = useSiteContext();

  return (
    <>
      <Navbar />
      <h1>What's up, <span className={styles.username}>{username}</span>?</h1>
    </>
  )
};

export default TaskHeader;
