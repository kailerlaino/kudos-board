import "./Header.css";
import { useTheme } from "../Misc/ThemeContext.jsx";

const Header = () => {
  const {theme, toggleTheme} = useTheme();
  return (
    <header className="banner-section">
      <div className="banner-container">
        <h2 className="banner-title">Kailer's Kudos</h2>
        <button 
          className="theme-toggle-button"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
        
      </div>
    </header>
  );
};

export default Header;
