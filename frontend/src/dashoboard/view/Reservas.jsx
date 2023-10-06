import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Reservas = () => {
  const [reservas, setReservas] = useState([])
  const [fechaReserva, setFechaReserva] = useState('')
  const [fechaSalida, setFechaSalida] = useState('')
  const [fechaLlegada, setFechaLlegada] = useState('')
  const [documentoCliente, setDocumentoCliente] = useState(''); // Estado para almacenar el documento del cliente
  const [clienteInfo, setClienteInfo] = useState(null); // Estado para almacenar la información del cliente

  const [isModalOpen, setIsModalOpen] = useState(false);

  //Fecha error
  const [errorFechaSalida, setErrorFechaSalida] = useState('');
  const [errorFechaLlegada, setErrorFechaLlegada] = useState('');



  useEffect(() => {
    getData();
    obtenerDestinos();
  }, []);

  const cleanData = () => {
    setReservas('')
    setFechaReserva('')
    setFechaSalida('')
    setFechaLlegada('')
    setSelectedDestino('')
    setClienteInfo(null);
  }

  const getData = async () => {
    const { data } = await axios.get("http://localhost:4000/api/reservas/");
    setReservas(data.reservas);
  };

  const saveReserva = async () => {
    try {

      if (!selectedDestino) {
        // Mostrar un mensaje de error o tomar alguna acción aquí
        return;
      }

      const newReserva = {
        fechaReserva,
        fechaSalida,
        fechaLlegada,
        destinos: selectedDestino,


      }
      await axios.post('http://localhost:4000/api/reservas/add', newReserva);
      cleanData()
      getData();
      closeModal();

      // SweetAlert2 para mostrar éxito
      Swal.fire({
        icon: 'success',
        title: 'La Resera se guardado exitosamente',
        showConfirmButton: false,
        timer: 1500
      });

    } catch (error) {
      if (!error.response.data.ok) {
        return alert(error.response.data.message)
      }
      console.log('error en saveReserva', error.message);

    }
  }
  const actions = async (e) => {
    e.preventDefault();
    saveReserva();

    // Realizar la consulta del cliente por documento
    try {
      const response = await axios.get(`http://localhost:4000/api/clientes/${documentoCliente}`);
      const data = response.data;

      if (data.ok) {
        setClienteInfo(data.message); // Almacenar la información del cliente
        saveReserva(); // Llamar a saveReserva después de obtener la información del cliente
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error al consultar cliente:', error.message);
    }
  };

  // Función para cerrar el modal de edición
  const closeModal = () => {
    setIsModalOpen(false);
  };





  //codigo nuevo para consultar cliente
  const consultarCliente = async (documentoCliente) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/clientes/${documentoCliente}`);
      const data = response.data;

      if (data.ok) {
        setClienteInfo(data.message);
        saveReserva();
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error al consultar cliente:', error.message);
    }
  };

  const completeDataFields = (item) => {
    setFechaReserva(item.fechaReserva)
    setFechaSalida(item.fechaSalida)
    setFechaLlegada(item.fechaLlegada)
    localStorage.setItem('id', item._id)

  }

  const deleteReserva = async (id) => {
    try {
      Swal.fire({
        title: 'Esta seguro?',
        text: "No podras revertir el proceso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await axios.delete('http://localhost:4000/api/reservas/' + id);
          getData();
          Swal.fire({
            icon: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
    } catch (error) {
      if (!error.response.data.ok) {
        return alert(error.response.data.message)
      }
      console.log('error en deleteReserva', error.message);
    }
  }

  //--------------------Todo sobre los destinos --------------------------------
  // Estados relacionados con destinos
  const [destinos, setDestinos] = useState([]);
  const [selectedDestino, setSelectedDestino] = useState("");
  const [destinoNombres, setDestinoNombres] = useState({});
  // Función para obtener la lista de destinos desde el servidor
  const obtenerDestinos = async () => {
    try {
      const response = await axios.get("/api/destinos/listall");
      console.log("Lista de destinos:", response);
      const destinosData = response.data.destinos;
      setDestinos(destinosData);
      // Crear un mapeo de _id a nombres
      const nombres = {};
      destinosData.forEach((destino) => {
        nombres[destino._id] = destino.nombreDestino;
      });
      setDestinoNombres(nombres);
    } catch (error) {
      console.error("Error al obtener la lista de destinos:", error);
    }
  };


  //Función para manejar el cambio de destino
  const handleDestinoChange = (destinosId) => {
    setSelectedDestino(destinosId);
  };


  return (
    <div>
      {/* Inicio del formulario*/}
      <div className='container-md mt-5'>
        <div className={`modal fade ${isModalOpen ? 'show' : ''}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!isModalOpen} style={{ display: isModalOpen ? 'block' : 'none' }}>
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header" style={{ backgroundColor: "#008cba" }}>
                <h5 className="modal-title text-white" id="exampleModalLabel">Ingreso de Reservas</h5>
                <button type="button" className="btn-close bg-white" onClick={() => {
                  cleanData(); // Limpia los campos del formulario
                  getData(); // Carga los datos actualizados
                  closeModal();
                }} />
              </div>
              <div className="modal-body">
                <div className='row'>
                  <div className='col-md-6'>
                    <form onSubmit={actions}>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="validationCustom01" className="form-label">Fecha Reserva</label>
                          <input
                            type="date"
                            className="form-control"
                            id="fechaReserva"
                            value={fechaReserva}
                            onChange={(e) => {
                              // Obtener la fecha actual en el formato yyyy-mm-dd
                              const fechaActual = new Date();
                              const año = fechaActual.getFullYear();
                              const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
                              const día = fechaActual.getDate().toString().padStart(2, '0');
                              const fechaActualFormat = `${año}-${mes}-${día}`;

                              // Actualizar el estado fechaReserva con la fecha actual
                              setFechaReserva(fechaActualFormat);
                            }}
                            required
                          />

                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="documentoCliente" className="form-label">Documento del Cliente</label>
                          <input
                            type="text"
                            className="form-control"
                            id="documentoCliente"
                            value={documentoCliente}
                            onChange={(e) => setDocumentoCliente(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="nombreCliente" className="form-label">Nombre del Cliente</label>
                        <input type="text" className="form-control" id="nombreCliente" />
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="fechaSalida" className="form-label">Fecha Salida</label>
                          <input
                            type="date"
                            className={`form-control ${errorFechaSalida ? 'is-invalid' : ''}`}
                            id="fechaSalida"
                            value={fechaSalida}
                            onChange={(e) => {
                              const newFechaSalida = e.target.value;
                              const fechaSalidaValidada = new Date(newFechaSalida);
                              const fechaReservaDate = new Date(fechaReserva);

                              if (fechaSalidaValidada < fechaReservaDate) {
                                setErrorFechaSalida('La fecha no puede ser menor a la fecha de reserva.');
                              } else if (fechaSalidaValidada.toDateString() === fechaReservaDate.toDateString()) {
                                setErrorFechaSalida('La fecha no puede ser igual a la fecha de reserva.');
                              } else {
                                setFechaSalida(newFechaSalida);
                                setErrorFechaSalida('');
                              }
                            }}
                            required
                          />
                          {errorFechaSalida && <div className="invalid-feedback">{errorFechaSalida}</div>}
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="fechaLlegada" className="form-label">Fecha Regreso</label>
                          <input
                            type="date"
                            className={`form-control ${errorFechaLlegada ? 'is-invalid' : ''}`}
                            id="fechaLlegada"
                            value={fechaLlegada}
                            onChange={(e) => {
                              const newFechaLlegada = e.target.value;
                              const fechaLlegadaValidada = new Date(newFechaLlegada);
                              const fechaReservaDate = new Date(fechaReserva);
                              const fechaSalidaDate = new Date(fechaSalida);

                              if (fechaLlegadaValidada < fechaReservaDate) {
                                setErrorFechaLlegada('La fecha de llegada no puede ser inferior a la fecha de reserva.');
                              } else if (fechaLlegadaValidada.toDateString() === fechaSalidaDate.toDateString()) {
                                setErrorFechaLlegada('La fecha de llegada no puede ser igual a la fecha de salida.');
                              } else if (fechaLlegadaValidada.toDateString() === fechaReservaDate.toDateString()) {
                                setErrorFechaLlegada('La fecha de llegada no puede ser igual a la fecha de reserva.');
                              } else {
                                setFechaLlegada(newFechaLlegada);
                                setErrorFechaLlegada('');
                              }
                            }}
                            required
                          />
                          {errorFechaLlegada && <div className="invalid-feedback">{errorFechaLlegada}</div>}
                        </div>

                      </div>
                      <div className="row mt-3">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="destino" className="form-label">Destino</label>
                          <select
                            className="form-select"
                            value={selectedDestino}
                            onChange={(e) => handleDestinoChange(e.target.value)}
                          >
                            <option value="">Seleccione un destino</option>
                            {Array.isArray(destinos) && destinos.length > 0 ? (
                              destinos.map((destinos) => (
                                <option key={destinos._id} value={destinos._id}>
                                  {destinos.nombreDestino}
                                </option>
                              ))
                            ) : (
                              <option value="" disabled>
                                Cargando destinos...
                              </option>
                            )}
                          </select>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="paquete" className="form-label">Paquete</label>
                          <select
                            className="form-select"
                            id="paquete"
                          >
                            <option value="">Selecciona un paquete</option>
                            <option value="paquete1">Paquete 1</option>
                            <option value="paquete2">Paquete 2</option>
                            {/* Agrega más opciones según tus necesidades */}
                          </select>
                        </div>
                      </div>
                      {/* Campo para ingresar el documento del cliente */}


                      {/* ... Resto del formulario ... */}
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => {
                            getData(); // Carga los datos actualizados
                            cleanData(); // Limpia los campos del formulario
                            closeModal();

                          }}
                          data-bs-dismiss="modal"
                        >
                          Cerrar
                        </button>
                        <button type="submit" className="btn btn-primary"  >Guardar Registro</button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-6">
                    <table className="table table-bordered border-1 table-hover mt-2">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Documento</th>
                          <th scope="col">Pasajeros</th>
                          <th scope="col">Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td><input type="text" className="form-control"
                          /></td>
                          <td><input type="text" className="form-control"
                          /></td>

                          <td>
                            <button type="button" className="btn btn-primary rounded-circle aling-end" style={{ backgroundColor: "#008cba" }} title="Haga clic para agregar un nuevo item del pauete">< i className="fa-solid fa-plus fa-beat "></i>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td><input type="text" className="form-control"
                          /></td>
                          <td><input type="text" className="form-control"
                          /></td>
                          <td>
                            <button type="button" className="btn btn-primary rounded-circle aling-end" style={{ backgroundColor: "#008cba" }} title="Haga clic para agregar un nuevo item del pauete">< i className="fa-solid fa-plus fa-beat "></i>
                            </button>
                          </td>

                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td><input type="text" className="form-control"
                          /></td>
                          <td><input type="text" className="form-control"
                          /></td>
                          <td>
                            <button type="button" className="btn btn-primary rounded-circle aling-end" style={{ backgroundColor: "#008cba" }} title="Haga clic para agregar un nuevo item del pauete">< i className="fa-solid fa-plus fa-beat "></i>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">4</th>
                          <td><input type="text" className="form-control"
                          /></td>
                          <td><input type="text" className="form-control"
                          /></td>
                          <td>
                            <button type="button" className="btn btn-primary rounded-circle aling-end" style={{ backgroundColor: "#008cba" }} title="Haga clic para agregar un nuevo item del pauete">< i className="fa-solid fa-plus fa-beat "></i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Fin del formulario*/}


      {/* Inicio de la tabla de Clientes*/}
      <div className='container container-flex card Larger shadow mt-3'>
        <div className="card-header d-flex justify-content-between align-items-center">
          <div className="dropdown no-arrow align-items-center">
            <button className="btn btn-link btn-sm dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown" type="button">
              <i className="fas fa-ellipsis-v text-gray-400"></i>
            </button>
            <div className="dropdown-menu shadow dropdown-menu-end animated--fade-in">
              <p className="text-center dropdown-header">Exportar:</p>
              <Link className="dropdown-item" href="#">
                <i className="fa-solid fa-file-pdf me-2"></i>Pdf
              </Link>
              <Link className="dropdown-item" href="#">
                <i className="fa-solid fa-file-excel me-2"></i> Excel
              </Link>
              <div className="dropdown-divider"></div><Link className="dropdown-item" href="#"> Somem</Link>
            </div>
          </div>
          <div>
            <h6 className="text-primary fw-bold m-0 mt-1 text-start">Lista de Reservas</h6>
          </div>
          <div>
            <input className="form-control me-5" aria-label="Search"
              type="text"
              placeholder="Buscar reserva..."
            />
          </div>
          <div>
            <button type="button" className="btn btn-primary rounded-circle aling-end" style={{ backgroundColor: "#008cba" }} onClick={() => {
              setIsModalOpen(true); // Abre la modal al hacer clic
            }} title="Haga clic para agregar un nuevo cliente">< i className="fa-solid fa-plus fa-beat "></i></button>
          </div>
        </div>
        {/* Mostrar tabla solo en dispositivos grandes (computadoras) */}
        <div className='d-none d-md-block'>
          <div className="table-responsive">
            <table className='table table-bordered border-1 table-hover mt-2'>
              {/* ... contenido de la tabla ... */}
              <thead>
                <tr style={{ background: "#008cba", color: "#ffffff" }}>
                  <th scope="col" className="responsive-text">#</th>
                  <th scope="col" className="responsive-text">Fecha Reserva</th>
                  <th scope="col" className="responsive-text">Fecha Salida</th>
                  <th scope="col" className="responsive-text">Fecha de Regreso</th>
                  <th scope="col" className="responsive-text"> Cliente</th>
                  <th scope="col" className="responsive-text">Destino</th>
                  <th scope="col" className="responsive-text">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(reservas) && reservas.map((item, i) => (
                  <tr key={item._id}>
                    <td className="responsive-text"> {i + 1}</td>
                    <td className="responsive-text"> {item.fechaReserva.slice(0, 10)} </td>
                    <td className="responsive-text"> {item.fechaSalida.slice(0, 10)} </td>
                    <td className="responsive-text"> {item.fechaLlegada.slice(0, 10)} </td>
                    <td className="responsive-text">{item.clientes}</td>
                    <td className="responsive-text">{destinoNombres[item.destinos]}</td>
                    <td>
                      <div className="btn-group btn-group-sm" role="group">
                        <span className='btn btn-primary d-flex align-items-center me-2'>
                          <i className="fa-solid fa-pencil space-i"></i>
                        </span>
                        <span className='btn btn-danger d-flex align-items-center'
                          onClick={() => deleteReserva(item._id)}
                        ><i className="fa-solid fa-trash"></i>
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div >
      {/* Mostrar tarjetas solo en dispositivos pequeños (móviles) */}
      <div className='d-md-none'>
        {Array.isArray(reservas) && reservas.map((item, i) => (
          <div key={item._id} className='card border-3'>
            {/* Contenido de la tarjeta */}
            <div className='card-body'>
              <h5 className='card-title'>Reserva {i + 1}</h5>
              <p className='card-text'>
                <strong>Fecha Reserva:</strong> {item.fechaReserva}<br />
                <strong>Fecha Salida:</strong> {item.fechaSalida}<br />
                <strong>Fecha de Regreso:</strong> {item.fechaLlegada}<br />
                <strong>Cliente:</strong> {item.cliente}<br />
                <strong></strong>
              </p>
              <div className='btn-group btn-group-xl'>
                <span className='btn btn-primary d-flex align-items-center me-2'>
                  <i className="fa-solid fa-pencil space-i"></i>
                </span>
                <span className='btn btn-danger d-flex align-items-center'
                  onClick={() => deleteReserva(item._id)}
                >
                  <i className="fa-solid fa-trash"></i>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Fin de la tabla de Reservas*/}
    </div>





  )
}



export default Reservas