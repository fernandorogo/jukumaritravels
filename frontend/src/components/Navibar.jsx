import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../image/logosinfondo.png';

const Navibar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLinkClick = () => {
    setIsCollapsed(true);
  };

  const navigateTo = (path) => {
    handleLinkClick();
    navigate(path);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light colormenu">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img className="rounded-circle border border-5" src={Logo} style={{ width: 100 }} alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={handleToggle}
            aria-controls="navbarSupportedContent"
            aria-expanded={!isCollapsed}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse justify-content-end${isCollapsed ? '' : ' show'}`} id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link text-white" onClick={() => navigateTo('/')}>
                  Inicio
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/destinos" className="nav-link text-white" onClick={() => navigateTo('/destinos')}>
                  Destinos
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/nosotros" className="nav-link text-white" onClick={() => navigateTo('/nosotros')}>
                  Quienes somos
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/login" className="nav-link text-white" onClick={() => navigateTo('/login')}>
                  Inicio de sesión
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navibar;
