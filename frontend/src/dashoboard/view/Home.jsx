import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs ';


const Home = () => {

  const [totalClientes, setTotalClientes] = useState(0);
  const [totalDestinos, setTotalDestinos] = useState(0);
  const [totalReservas, setTotalReservas] = useState(0);


  // Función para realizar la solicitud HTTP
  const fetchTotalClientes = () => {
    axios.get('/api/clientes/listall')
      .then(response => {
        const data = response.data;
        if (data.ok) {
          setTotalClientes(data.totalClientes);
        } else {
          console.error('Error en la solicitud al servidor: ', data.message);
        }
      })
      .catch(error => {
        console.error('Error en la solicitud: ', error);
      });
  };


  // Función para obtener el total de destinos
  const fetchTotalDestinos = () => {
    axios.get('/api/destinos/listAll')
      .then(response => {
        const data = response.data;
        if (data.ok) {
          setTotalDestinos(data.totalDestinos);
        } else {
          console.error('Error en la solicitud al servidor: ', data.message);
        }
      })
      .catch(error => {
        console.error('Error en la solicitud: ', error);
      });
  };

  // Función para obtener el total de reservas
  const fetchTotalReservas = () => {
    axios.get('/api/reservas/listall')
      .then(response => {
        const data = response.data;
        if (data.ok) {
          setTotalReservas(data.totalReservas);
        } else {
          console.error('Error en la solicitud al servidor: ', data.message);
        }
      })
      .catch(error => {
        console.error('Error en la solicitud: ', error);
      });
  };


  // Llama a fetchTotalClientes cuando el componente se monta
  useEffect(() => {
    fetchTotalClientes();
    fetchTotalDestinos();
    fetchTotalReservas();
    fetchRandomDestinos();
    obtenerDestinos();
    fetchReservas();
    fetchClientesByCurrentMonth();
  }, []);

  const [reservas, setReservas] = useState([]);
  const [destinoNombres, setDestinoNombres] = useState([]);

  const obtenerDestinos = async () => {
    try {
      const response = await axios.get('/api/destinos/listall'); // Reemplaza la URL con la correcta
      const destinosData = response.data.destinos;
      const nombres = {};
      destinosData.forEach((destino) => {
        nombres[destino._id] = destino.nombreDestino;
      });
      setDestinoNombres(nombres);
    } catch (error) {
      console.error('Error al obtener la lista de destinos:', error);
    }
  };

  // Función para obtener las reservas desde el servidor
  const fetchReservas = () => {
    axios.get('/api/reservas/listbydata')
      .then(response => {
        const data = response.data;
        if (data.ok) {
          setReservas(data.reservas);
        } else {
          console.error('Error en la solicitud al servidor: ', data.message);
        }
      })
      .catch(error => {
        console.error('Error en la solicitud: ', error);
      });
  };


  //----------------------------------------------------------------

  const [destinos, setDestinos] = useState([]);

  /// Función para obtener 10 destinos aleatorios
  const fetchRandomDestinos = async () => {
    try {
      const response = await axios.get('/api/destinos/listall');
      const data = response.data;
      if (data.ok) {
        const allDestinos = data.destinos;
        const firstTenDestinos = allDestinos.slice(0, 10); // Obtén los primeros 10 destinos
        setDestinos(firstTenDestinos);
      } else {
        console.error('Error en la solicitud al servidor: ', data.message);
      }
    } catch (error) {
      console.error('Error en la solicitud: ', error);
    }
  };



  const [clientes, setClientes] = useState([]);

  // Función para obtener clientes cuyas fechas de nacimiento están en el mes actual
  const fetchClientesByCurrentMonth = async () => {
    try {
      const response = await axios.get('/api/clientes/current-month');
      const data = response.data;
      if (data.ok) {
        setClientes(data.clientes);
      } else {
        console.error('Error en la solicitud al servidor: ', data.message);
      }
    } catch (error) {
      console.error('Error en la solicitud: ', error);
    }
  };


  return (
    <div>
      <div className=" container" style={{ textAlign: 'left' }}>
        <Breadcrumbs />
      </div>
      <div className='container-md mt-5'>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card shadow" >
              <div className="card-body">
                <div className="card container text-center mb-2">
                  <h5>Total Usuarios</h5>
                  <div className="row align-items-center justify-content-center">
                    <div className="col-6 col-md-3 d-flex justify-content-end">
                      <i className="fa-solid fa-users fa-2x"></i>
                    </div>
                    <div className="col-6 col-md-3 d-flex justify-content-start">
                      <p>{totalClientes}</p>
                    </div>
                  </div>
                </div>
                <div className="card container text-center">
                  <h5>Cumpleaños del Mes</h5>
                  <div className="row align-items-center justify-content-center">
                    <ul>
                      {clientes.map((cliente) => (
                        <li key={cliente._id}>
                          <p>{cliente.nombre1Cliente} {cliente.apellido1Cliente} {cliente.fechanacimientoCliente.slice(0, 10)}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow" >
              <div className="card-body">
                <div className="card container text-center mb-2">
                  <h5>Total destinos</h5>
                  <div className="row align-items-center justify-content-center">
                    <div className="col-6 col-md-3 d-flex justify-content-end">
                      <i className="fa-solid fa-plane fa-2xl"></i>
                    </div>
                    <div className="col-6 col-md-3 d-flex justify-content-start">
                      <p>{totalDestinos}</p>
                    </div>
                  </div>
                </div>
                <div className="card container text-center">
                  <h5>Nuestros destinos</h5>
                  <div className="row align-items-center justify-content-center">
                    <ul>
                      {destinos.map((destino, index) => (
                        <li key={index}>{destino.nombreDestino}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="col-md-4 mb-4">
            <div className="card shadow" >
              <div className="card-body">
                <div className="card container text-center mb-2">
                  <h5>Total Reservas</h5>
                  <div className="row align-items-center justify-content-center">
                    <div className="col-6 col-md-3 d-flex justify-content-end">
                      <i className="fa-solid fa-hotel fa-2xl"></i>
                    </div>
                    <div className="col-6 col-md-3 d-flex justify-content-start">
                      <p>{totalReservas}</p>
                    </div>
                  </div>
                </div>
                <div className="card container text-center">
                  <div className="row align-items-center justify-content-center">
                    <div className="col-6 col-md-3 d-flex justify-content-end">
                    </div>
                    <table>
                      <thead>
                        <tr>
                          <th>Fecha de Salida</th>
                          <th>Destino</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reservas.map((reserva, index) => (
                          <tr key={index}>
                            <td>{reserva.fechaSalida.slice(0, 10)}</td>
                            <td>
                              {reserva.destinos.map((destinoId, dIndex) => (
                                <span key={dIndex}>
                                  {destinoNombres[destinoId] || 'Cargando...'}
                                  {dIndex < reserva.destinos.length - 1 ? ', ' : ''}
                                </span>
                              ))}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}

export default Home