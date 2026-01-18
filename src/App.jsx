import { useState } from "react";
import { Routes, Route } from "react-router-dom";
 import Home from "./pages/main/Home";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("isDarkMode") === "true"
  );

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    localStorage.setItem("isDarkMode", !isDarkMode);
  };

  return (
    <div className={`${isDarkMode ? "dark" : "light"}`}>
      <Routes>
        <Route
          path="/"
          element={<Home toggleDarkMode={toggleDarkMode} />}
        />
    
      </Routes>
    </div>
  );
}

export default App;
