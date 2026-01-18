import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Home from "./pages/main/Home";
import Header from "./pages/main/header/Header";
import Work from "./pages/work/Work";
import ShowCase from "./pages/showcase/ShowCase";
import Crew from "./pages/crew/Crew";
import Connect from "./pages/connect/Connect";

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
        <Route path="/work" element={<><Header /><Work /></>} />
        <Route path="/showcase" element={<><Header /><ShowCase /></>} />
        <Route path="/crew" element={<><Header /><Crew /></>} />
        <Route path="/connect" element={<><Header /><Connect /></>} />
      </Routes>
    </div>
  );
}

export default App;
