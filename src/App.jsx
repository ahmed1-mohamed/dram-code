import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Home from "./pages/main/Home";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("isDarkMode") === "true"
  );

  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

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
