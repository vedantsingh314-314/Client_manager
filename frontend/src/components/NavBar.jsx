import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  return (
    <div className="navbar">
      <h1>Outreach CRM</h1>
      <div className="nav-links">
        <Link to="/" className={`nav-btn ${location.pathname === '/' ? 'active' : ''}`}>
          + Add Company
        </Link>
        <Link to="/dashboard" className={`nav-btn ${location.pathname === '/dashboard' ? 'active' : ''}`}>
          Dashboard
        </Link>
      </div>
    </div>
  );
}

export default Navbar;