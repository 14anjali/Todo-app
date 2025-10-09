import React from "react";

const DarkModeToggle=({darkMode,setDarkMode})=>{
return(
     <button
      onClick={() => setDarkMode(!darkMode)}
      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded transition-colors duration-300"
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
)
}
export default DarkModeToggle