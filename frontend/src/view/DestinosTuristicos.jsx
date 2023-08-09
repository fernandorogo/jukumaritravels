import React, { useState } from 'react';
import Navibar from '../components/Navibar'
import listaDestinosTuristicos from '../view/ListaDestinosTuristicos';
import Footer from '../components/Footer'

const DestinosTuristicos = () => {
  const [filtroCiudad, setFiltroCiudad] = useState('');

  const filtrarPorCiudad = (event) => {
    setFiltroCiudad(event.target.value);
  };

  const obtenerCiudadesUnicas = () => {
    const ciudadesUnicas = [...new Set(listaDestinosTuristicos.map((destino) => destino.destino))];
    return ciudadesUnicas;
  };

  const destinosFiltrados = listaDestinosTuristicos.filter((destino) =>
    destino.destino.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(filtroCiudad.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
  );

  return (
    <div>
      <Navibar/>
      <div className="container">
      
      <h1 className="my-4">Nuestros Destinos Turísticos</h1>
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="filtroCiudad" className="form-label">
            Filtrar por ciudad: felter gilter filter
          </label>
          <input
            type="text"
            id="filtroCiudad"
            className="form-control"
            value={filtroCiudad}
            onChange={filtrarPorCiudad}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="selectCiudad" className="form-label">
            Ciudades disponibles:
          </label>
          <select id="selectCiudad" className="form-select" value={filtroCiudad} onChange={filtrarPorCiudad}>
            <option value="">Todas las ciudades</option>
            {obtenerCiudadesUnicas().map((ciudad, index) => (
              <option value={ciudad} key={index}>
                {ciudad}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        {destinosFiltrados.map((destino, index) => (
          <div className="col-md-4" key={index}>
            <div className="card mb-4">
              <img src={destino.imagen} className="card-img-top" alt={destino.destino} />
              <div className="card-body">
                <h5 className="card-title">{destino.destino}</h5>
                <p className="card-text">{destino.lema}</p>
                <p className="card-text">{destino.resena}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

          <Footer/> 
    </div>
      
    
  );
};

export default DestinosTuristicos;
