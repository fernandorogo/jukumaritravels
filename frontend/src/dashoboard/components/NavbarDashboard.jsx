import React, { useState } from 'react';
import Logo from '../Images/Logo.png'
import { Link, useNavigate } from 'react-router-dom';

const NavbarDashboard = () => {
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
          <button className="navbar-toggler" type="button" onClick={handleToggle}             aria-controls="navbarSupportedContent" aria-expanded={!isCollapsed} aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse justify-content-end${isCollapsed ? '' : ' show'}`} id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/aplication" className="nav-link text-white" onClick={() => navigateTo('/')}>
                  <i className="fa-solid fa-house fa-sm me-2"></i>Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link to="reservas" className="nav-link text-white" onClick={() => navigateTo('/reservas')}>
                  <i className="fa-solid fa-hotel fa-sm me-2"></i>Reservas
                </Link>
              </li>

              <li className="nav-item">
                <Link to="paquetes" className="nav-link text-white" onClick={() => navigateTo('/paquetes')}>
                  <i className="fa-solid fa-box-open fa-sm me-2"></i>Paquetes
                </Link>
              </li>
              <li className="nav-item">
                <Link to="destinos" className="nav-link text-white" onClick={() => navigateTo('/destinos')}>
                  <i className="fa-solid fa-plane fa-sm me-2"></i>Destinos
                </Link>
              </li>
              <li className="nav-item">
                <Link to="cliente" className="nav-link text-white" onClick={() => navigateTo('/cliente')}>
                  <i className="fa-sharp fa-solid fa-person fa-sm me-2"></i>Clientes
                </Link>
              </li>
              <li className="nav-item">
                <Link to="proveedores" className="nav-link text-white" onClick={() => navigateTo('/proveedores')}>
                  <i className="fa-solid fa-parachute-box fa-sm me-2"></i>Proveedores
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle text-white" id="navbarDropdown" role="button"  data-bs-toggle="dropdown" aria-expanded="false"
                >
                  <i className="fa-solid fa-user-tie fa-sm me-2"></i>
                  Usuario
                </Link>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <Link className="dropdown-item">
                      <i className="fas fa-user fa-sm fa-fw me-2 text-gray-400"></i>
                      Perfil
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item"><i className="fas fa-cogs fa-sm fa-fw me-2 text-gray-400"></i> Configurción</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item"><i className="fas fa-list fa-sm fa-fw me-2 text-gray-400"></i> Registro de actividades</Link>
                  </li>
                  <li>
                    <Link to="/login" className="dropdown-item"><i className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>
                      Cerrar sesión
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavbarDashboard;