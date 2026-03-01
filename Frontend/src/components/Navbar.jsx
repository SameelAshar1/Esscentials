import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useCart } from "../context/CartContext";

const ADMIN_TOKEN_KEY = "adminToken";

function Navbar() {
  const logoPath = "/images/logo.png";
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAdminAuthenticated = !!window.localStorage.getItem(ADMIN_TOKEN_KEY);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem(ADMIN_TOKEN_KEY);
    setIsMenuOpen(false);
    navigate("/");
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="logo" onClick={closeMenu}>
            <img
              src={logoPath}
              alt="Esscentials"
              className="logo-image"
              onError={(e) => {
                // Hide image if it fails to load, show text only
                e.target.style.display = "none";
              }}
            />
            <span className="logo-text">Esscentials</span>
          </Link>
          <button
            type="button"
            className="nav-toggle"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className={isMenuOpen ? "icon-open" : ""} />
            <span className={isMenuOpen ? "icon-open" : ""} />
            <span className={isMenuOpen ? "icon-open" : ""} />
          </button>
          <ul className={`nav-links ${isMenuOpen ? "nav-open" : ""}`}>
            <li><Link to="/" onClick={closeMenu}>Home</Link></li>
            <li><Link to="/products" onClick={closeMenu}>Products</Link></li>
            <li><Link to="/about" onClick={closeMenu}>About</Link></li>
            {isAdminAuthenticated ? (
              <>
                <li><Link to="/admin" onClick={closeMenu}>Add Product</Link></li>
                <li><Link to="/admin/products" onClick={closeMenu}>Manage Products</Link></li>
                <li>
                  <button type="button" className="logout-button" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li><Link to="/admin/login" onClick={closeMenu}>Admin Login</Link></li>
            )}
            <li>
              <Link to="/cart" onClick={closeMenu}>
                Cart{itemCount > 0 ? ` (${itemCount})` : ""}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
