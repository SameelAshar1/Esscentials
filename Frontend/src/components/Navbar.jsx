import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const logoPath = "/images/logo.png";

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="logo">
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
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/admin">Add Product</Link>
            </li>
            <li>
              <Link to="/admin/products">Manage Products</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
