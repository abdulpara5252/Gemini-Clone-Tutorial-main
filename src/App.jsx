import React, { useState } from "react"
import Sidebar from "./components/Sidebar"
import MainContent from "./components/MainContent"

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        } transition-all`}
    >
      <div className="flex animate-fadeIn duration-1000">
        <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
        <MainContent darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
      </div>
    </div>
  )
}

export default App
