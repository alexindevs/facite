import React, { createContext, useContext, useState } from 'react';

const SiteContext = createContext();

export const useSiteContext = () => {
  return useContext(SiteContext);
};

const SiteContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  return (
    <SiteContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        username,
        setUsername
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export default SiteContextProvider;
