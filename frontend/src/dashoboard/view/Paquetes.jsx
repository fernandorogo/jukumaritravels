import axios from 'axios';
import Pagination from 'rc-pagination';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Paquetes = () => {
  // Estado para los campos principales del paquete turístico
  const [nombrePaqueteTuristico, setNombrePaqueteTuristico] = useState('');
  const [reseñaPaqueteTuristico, setReseñaPaqueteTuristico] = useState('');
  const [valorPaqueteTuristico, setValorPaqueteTuristico] = useState('');
  const [selectedDestino, setSelectedDestino] = useState('');
  const [destinos, setDestinos] = useState([]);

  const [paquetesturisticos, setPaquetesturisticos] = useState([]);


  // Estado para los detalles del paquete
  const [details, setDetails] = useState([
    {
      nombredetallePaquete: '',
      showPriceInput: false,
      preciodetallePaquete: '',
      isAdding: true,
    },
  ]);

  // Estado para la paginación
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState('');

  //const [edit, setEdit] = useState(false);
  //const [isModalOpen, setIsModalOpen] = useState(false)


  useEffect(() => {
    getData(page);
    obtenerDestinosDesdeServidor();
  }, [page]);

  const cleanData = () => {
    setNombrePaqueteTuristico('');
    setReseñaPaqueteTuristico('');
    setValorPaqueteTuristico('');
    setSelectedDestino('');
    setDetails([
      {
        nombredetallePaquete: '',
        showPriceInput: false,
        preciodetallePaquete: '',
        isAdding: false,
      },
    ]);
  };

  const getData = async (pageCurrent) => {
    try {
      const response = await axios.get(`/api/paquetes/list?page=${pageCurrent}`);
      if (response.data.ok) {
        const { docs, page, totalPages } = response.data.paquetesturisticos;
        setPaquetesturisticos(docs);
        setPage(page);
        setTotalPages(totalPages);
      } else {
        // Manejar cualquier error en la respuesta, por ejemplo, mostrar un mensaje de error
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error al obtener datos', error);
    }
  };

  // Función para manejar cambios en la página
  const onChangePage = (page) => {
    getData(page);
  };

  const actions = (e) => {
    e.preventDefault(); // Previene la recarga de la página al enviar el formulario
    console.log('La función actions se ha llamado correctamente.');

  };


  const deletePaquete = async (id) => {
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
          const { data } = await axios.delete(`/api/paquetes/` + id);
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
      console.log('error en deletePaquete', error.message);
    }
  }

  const handleDetailChange = (index, field, value) => {
    const updatedDetails = [...details];
    updatedDetails[index][field] = value;
    setDetails(updatedDetails);
  };

  const handleCheckboxChange = (index) => {
    const updatedDetails = [...details];
    updatedDetails[index].showPriceInput = !updatedDetails[index].showPriceInput;
    setDetails(updatedDetails);
  };

  const handleDetailAction = (index) => {
    const updatedDetails = [...details];
    const detail = updatedDetails[index];


    if (detail.isAdding) {
      // Si está en modo "crear", cambia a modo "eliminar" y crea una nueva fila arriba
      detail.isAdding = false;
      const newDetail = {
        nombredetallePaquete: '', // Limpiar el campo correspondiente
        preciodetallePaquete: 0, // Limpiar el campo correspondiente
        isAdding: true, // Nueva fila en modo "crear"
      };

      updatedDetails.splice(index, 0, newDetail); // Insertar la nueva fila al inicio
    } else if (updatedDetails.length > 1) {
      // Si está en modo "eliminar" y hay más de una fila, elimina la fila
      updatedDetails.splice(index, 1);
    }
    
    setDetails(updatedDetails);

    
   

  };

  const obtenerDestinosDesdeServidor = async () => {
    try {
      const response = await axios.get('/api/destinos/listall');
      console.log("Lista de destinos:", response);
      setDestinos(response.data.destinos);
    } catch (error) {
      console.error('Error al obtener destinos', error);
    }
  };



  return (
    <div>
      <div className='container-md mt-5'>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-xl">
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="modal-header" style={{ backgroundColor: "#008cba" }}>
                  <h5 className="modal-title text-white" id="exampleModalLabel">Ingreso de Paquetes</h5>
                  <button type="button" className="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body ">

                  <div className="row">
                    <div className="col-md-5 border border-2 ms-3">
                      <form onSubmit={(e) => actions(e)}>
                        <div className="col-md-12">
                          <label htmlFor="validationCustom01" className="form-label">Nombre del Paquete Turístico</label>
                          <input
                            type="text"
                            className="form-control"
                            id="paqueteTuristico"
                            value={nombrePaqueteTuristico}
                            onChange={(e) => setNombrePaqueteTuristico(e.target.value.toUpperCase())}
                            required
                          />
                        </div>
                        <div className="col-md-12">
                          <label htmlFor="exampleFormControlTextarea1" className="form-label">Reseña del Paquete Turístico</label>
                          <textarea
                            className="form-control"
                            id="reseñaPaqueteTuristico"
                            value={reseñaPaqueteTuristico}
                            onChange={(e) => setReseñaPaqueteTuristico(e.target.value)}
                          ></textarea>
                        </div>
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label htmlFor="destino" className="form-label">Destino</label>
                            <select
                              className='form-select'
                              id="destinoSelect"
                              value={selectedDestino}
                              onChange={(e) => setSelectedDestino(e.target.value)}
                            >
                              <option value="">Seleccione un destino</option>
                              {Array.isArray(destinos) && destinos.length > 0 ? (
                                destinos.map((destino) => (
                                  <option key={destino._id} value={destino._id}>
                                    {destino.nombreDestino}
                                  </option>
                                ))
                              ) : (
                                <option value="" disabled>
                                  Cargando destinos...
                                </option>
                              )}
                            </select>
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="validationCustom01" className="form-label">Costo por Persona</label>
                            <input
                              type="text"
                              className="form-control"
                              id="valorPaqueteTuristico"
                              value={valorPaqueteTuristico}
                              onChange={(e) => setValorPaqueteTuristico(e.target.value.toUpperCase())}
                            />
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                          <button type="submit" className="btn text-white" style={{ backgroundColor: "#008cba" }}>Guardar Registro</button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-6 border border-2 table-responsive container container-flex">
                      <form action="">
                        <table className="table table-hover mt-2">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Detalle de Paquete</th>
                              <th scope="col">Adición</th>
                              <th>Precio</th>
                              <th scope="col">Acción</th>
                            </tr>
                          </thead>
                          <tbody style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {details.map((detail, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="nombredetallePaquete"
                                    value={detail.nombredetallePaquete}
                                    onChange={(e) => handleDetailChange(index, 'nombredetallePaquete', e.target.value)}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="checkbox"
                                    name={`showPriceInput-${index}`}
                                    checked={detail.showPriceInput}
                                    onChange={() => handleCheckboxChange(index)}
                                  />
                                </td>
                                <td>
                                  {detail.showPriceInput && (
                                    <input
                                      className="form-control"
                                      type="number"
                                      name="preciodetallePaquete"
                                      value={detail.preciodetallePaquete}
                                      onChange={(e) => handleDetailChange(index, 'preciodetallePaquete', e.target.value)}
                                      placeholder="Precio"

                                    />
                                  )}
                                </td>
                                <td>
                                  <button
                                    onClick={() => handleDetailAction(index)}
                                    type="button"
                                    className={`btn ${detail.isAdding ? 'btn-primary' : 'btn-danger'
                                      } rounded-circle align-end`}
                                    style={{
                                      backgroundColor: detail.isAdding ? '#008cba' : '#ff0000',
                                    }}
                                    title={
                                      detail.isAdding
                                        ? 'Haga clic para agregar un nuevo item del paquete'
                                        : 'Haga clic para eliminar este item del paquete'
                                    }
                                  >
                                    <i
                                      className={`fa-solid ${detail.isAdding ? 'fa-plus' : 'fa-minus'
                                        } fa-beat`}
                                    ></i>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >

        {/* Inicio de la tabla de Clientes*/}
        < div className='container container-flex card Larger shadow mt-3' >
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
              <h6 className="text-primary fw-bold m-0 mt-1 text-start">Lista de Paquetes</h6>
            </div>
            <div>
              <input className="form-control me-5" aria-label="Search"
                type="text"
                placeholder="Buscar paquete..."
              />
            </div>
            <div>
              <button type="button" className="btn btn-primary rounded-circle aling-end" style={{ backgroundColor: "#008cba" }} data-bs-toggle="modal" data-bs-target="#exampleModal">
                < i className="fa-solid fa-plus fa-beat "></i>
              </button>
            </div>
          </div>
          {/* Mostrar tabla solo en dispositivos grandes (computadoras) */}
          <div className='d-none d-md-block'>
            <div className="table-responsive">
              <table className='table table-bordered border-1 table-hover mt-2'>
                {/* ... contenido de la tabla ... */}
                <thead>
                  <tr style={{ background: "#008cba", color: "#ffffff" }}>
                    <th scope="col" className="responsive-text" >#</th>
                    <th scope="col" className="responsive-text">Nombre Paquete</th>
                    <th scope="col" className="responsive-text">Reseña del Paquete</th>
                    <th scope="col" className="responsive-text">Valor</th>
                    <th scope="col" className="responsive-text">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(paquetesturisticos) && paquetesturisticos.map((item, i) => (
                    <tr key={item._id}>
                      <td className="responsive-text">{i + 1}</td>
                      <td className="responsive-text">{item.nombrePaqueteTuristico}</td>
                      <td className="responsive-text">{item.reseñaPaqueteTuristico}</td>
                      <td className="responsive-text">{item.valorPaqueteTuristico}</td>
                      <td>
                        <div className='btn-group btn-group-xl'>
                          <span className='btn btn-primary d-flex align-items-center me-2'>
                            <i className=" fa-solid fa-pencil space-i "></i>
                          </span>
                          <span className='btn btn-danger me-2  '
                            onClick={() => deletePaquete(item._id)}
                          ><i className="fa-solid fa-trash"></i></span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Mostrar tarjetas solo en dispositivos pequeños (móviles) */}
          <div className='d-md-none'>
            {Array.isArray(paquetesturisticos) && paquetesturisticos.map((item, i) => (
              <div key={item._id} className='card border-3'>
                {/* Contenido de la tarjeta */}
                <div className='card-body'>
                  <h5 className='card-title'>Paquete {i + 1}</h5>
                  <p className='card-text'>
                    <strong>Nombre paquete:</strong> {item.nombrePaqueteTuristico}<br />
                    <strong>Reseña del Paquete:</strong> {item.reseñaPaqueteTuristico}<br />
                    <strong>Valor:</strong> {item.valorPaqueteTuristico}<br />
                    <strong></strong>
                  </p>
                  <div className='btn-group btn-group-xl'>
                    <span className='btn btn-primary d-flex align-items-center me-2'>
                      <i className="fa-solid fa-pencil space-i"></i>
                    </span>
                    <span className='btn btn-danger d-flex align-items-center'
                      onClick={() => deletePaquete(item._id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="my-1 d-flex justify-content-end mb-3 border-5">
            <Pagination
              className='pagination'
              current={page}
              total={totalPages}
              pageSize={1}
              onChange={onChangePage}
            />
          </div>
        </div >
        {/* Fin de la tabla de Clientes*/}
      </div >
    </div >
  )
}

export default Paquetes