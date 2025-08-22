import { useState, createContext, useContext } from "react";

const ThemeContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () =>{
  return useContext(ThemeContext)
}

const ThemeProvider = ({ children }) => {
  const [color, setColor] = useState('')

    const toggleColor = (newColor) => {
    setColor(newColor);
  };

  return (
    <ThemeContext.Provider value={{ color, toggleColor }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider