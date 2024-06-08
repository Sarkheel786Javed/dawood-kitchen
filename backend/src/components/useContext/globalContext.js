import React, { createContext } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  let Cart = JSON.parse(localStorage.getItem("cart"));

  // const [darkMode, setDarkMode] = useState(false);

  // const toggleTheme = () => {
  //   setDarkMode(!darkMode);
  // };

  return (
    <ThemeContext.Provider value={{ 
      // darkMode,
      // toggleTheme,
      Cart }}>
      {children}
    </ThemeContext.Provider>
  );
};
