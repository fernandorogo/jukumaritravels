import axios from 'axios';
import Pagination from 'rc-pagination';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Breadcrumbs from '../components/Breadcrumbs ';

const Paquetes = () => {
  // Estado para los campos principales del paquete turístico
  const [paquetesturisticos, setPaquetesTuristicos] = useState([]);
  const [nombrePaqueteTuristico, setNombrePaqueteTuristico] = useState('');
  const [reseñaPaqueteTuristico, setReseñaPaqueteTuristico] = useState('');
  const [valorPaqueteTuristico, setValorPaqueteTuristico] = useState('');
  const [destinos, setDestinos] = useState([]);
  const [selectedDestino, setSelectedDestino] = useState("");
  const [destinoNombres, setDestinoNombres] = useState({}); 
  //Search
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPaquetes, setFilteredPaquetes] = useState([]); // Aquí almacenarás los Paquetes filtrados

  // Estado para los detalles del paquete
  const [detallesPaquetesTuristicos, setDetallesPaquetesTuristicos] = useState([
    {
      nombredetallesPaqueteTuristico: '',
      precioDetallesPaqueteTuristico: '',
      isAdding: true,
    },
  ]);

  // Estado para la paginación
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState('');

  const [edit, setEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false)


  useEffect(() => {
    getData(page);
    obtenerDestinos();
  }, [page]);

  // Limpiar campos del formulario

  const cleanData = () => {
    setNombrePaqueteTuristico('');
    setReseñaPaqueteTuristico('');
    setValorPaqueteTuristico('');
    setSelectedDestino('');
    setDetallesPaquetesTuristicos([
      {
        nombredetallesPaqueteTuristico: '',
        precioDetallesPaqueteTuristico: '',
        isAdding: false,
      },
    ]);

    setEdit(false);

  };

  const getData = async (pageCurrent) => {
    const { data } = await axios.get(`/api/paquetes/list?page=${pageCurrent}`);
    setPaquetesTuristicos(data.paquetesturisticos.docs);
    setFilteredPaquetes(data.paquetesturisticos.docs);
    setPage(data.paquetesturisticos.page);
    setTotalPages(data.paquetesturisticos.totalPages);
  };

  // Función para manejar cambios en la página
  const onChangePage = (page) => {
    getData(page);
  };

  const savePaquete = async () => {
    try {

      if (!selectedDestino) {
        // Mostrar un mensaje de error o tomar alguna acción aquí
        return;
      }

      const newPaquete = {
        nombrePaqueteTuristico,
        reseñaPaqueteTuristico,
        valorPaqueteTuristico,
        destinos: selectedDestino, // Utiliza el destino seleccionado
        detallesPaqueteTuristico: detallesPaquetesTuristicos.map((detalle) => ({
          nombredetallesPaqueteTuristico: detalle.nombredetallesPaqueteTuristico,
          precioDetallesPaqueteTuristico: detalle.precioDetallesPaqueteTuristico,
        })),
      };

      await axios.post('/api/paquetes/add', newPaquete);
      cleanData();
      getData();
      closeModal();

      // SweetAlert2 para mostrar éxito
      Swal.fire({
        icon: 'success',
        title: 'El paquete turístico ha sido registrado con éxito',
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        getData();
      }, 1000); // Espera 1 segundo antes de recargar

    } catch (error) {
      if (!error.response.data.ok) {
        return alert(error.response.data.message)
      }
      console.log('error en savePaquete', error.message);
    }
  }

  // Actualziar Paquete registrado

  const updatePaquete = async () => {
    try {
      const id = localStorage.getItem('id');
      const elementosAEliminar = [];

      const newPaquete = {
        nombrePaqueteTuristico,
        reseñaPaqueteTuristico,
        valorPaqueteTuristico,
        destinos: selectedDestino, // Utiliza el destino seleccionado
        //----------------------------------------------------------------
        detallesPaqueteTuristico: [], // Agrega detallesPaqueteTuristico vacío por ahora
        deldetallesPaqueteTuristico: elementosAEliminar // Agrega deldetallesPaqueteTuristico vacío por ahora
      };

      // Realizar la solicitud PUT para actualizar el paquete turístico
      const { data } = await axios.put('/api/paquetes/' + id, newPaquete);

      setSelectedDestino(destinos)

      // Limpiar los datos, cerrar el modal y realizar otras acciones necesarias
      cleanData();
      closeModal();
      getData();

      // Mostrar una notificación de éxito
      Swal.fire({
        icon: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      if (!error.response.data.ok) {
        return alert(error.response.data.message);
      }
      console.log('Error en updatePaquete', error.message);
    }
  };




  const editData = (item) => {
    console.log('Datos de item:', item); // Agrega esta línea
    setEdit(true);
    setNombrePaqueteTuristico(item.nombrePaqueteTuristico || '');
    setReseñaPaqueteTuristico(item.reseñaPaqueteTuristico || '');
    setValorPaqueteTuristico(item.valorPaqueteTuristico || '');
    setSelectedDestino(item.destinos || '');
    handleDestinoChange(item.destinos);

    // Carga los detalles existentes en el estado detallesPaqueteTuristicoEdit
    //setDetallesPaquetesTuristicos(item.detallesPaqueteTuristico || []);
    //setDetallesPaquetesTuristicos([...item.detallesPaqueteTuristico]);
    setDetallesPaquetesTuristicos(item.detallesPaqueteTuristico);


    localStorage.setItem('id', item._id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  //este codigo funciona muy bien. Borra todo desde el _id del paquete
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

  const actions = async (e) => {
    e.preventDefault();
    edit ? updatePaquete() : savePaquete();
  };


  const handleAddRow = () => {
    // Crea una nueva fila de detalle con valores iniciales
    const newDetail = {
      nombredetallesPaqueteTuristico: '',
      precioDetallesPaqueteTuristico: '',
      isAdding: true, // La nueva fila se marca como "agregando"
    };

    // Agrega la nueva fila al estado de detallesPaquetesTuristicos
    setDetallesPaquetesTuristicos([...detallesPaquetesTuristicos, newDetail]);
  };




  //----------------------------------------------------------------


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


  //Mi filtro
  const searchFields = [
    'nombrePaqueteTuristico',
  
    
   

    // Agrega más campos aquí
  ];

  const handleSearch = (event) => {
    const searchText = event.target.value;
    setSearchTerm(searchText);

    // Filtra los clientes en base a los campos de búsqueda definidos
    const filtered = paquetesturisticos.filter((paquetesturistico) =>
      searchFields.some((field) =>
        String(paquetesturistico[field]).toLowerCase().includes(searchText.toLowerCase())
      )
    );
    setFilteredPaquetes(filtered);
  };


  //------------------------------------------------------

  // Función para agregar detalles a un paquete turístico
  const addToSet = async (packageId, detailsToAdd) => {
    try {
      // Realiza una solicitud POST para agregar detalles al paquete
      const response = await axios.post(`/api/paquetes/${packageId}/detalles`, { detailsToAdd });

      // Llama a getData para actualizar la lista de detalles
      getData(page); // Asegúrate de que la variable "page" esté disponible en este contexto

      // Devuelve la respuesta del servidor (puede contener información adicional)
      return response.data;
    } catch (error) {
      // Maneja errores si la solicitud falla
      console.error('Error al agregar detalles:', error);
      throw error; // Lanza el error para que pueda ser manejado en otro lugar si es necesario
    }
  }


  // Función para eliminar detalles de un paquete turístico
  const pullAll = async (packageId, detailsToRemove) => {
    try {
      const response = await axios.delete(`/api/paquetes/${packageId}/detalles`, { data: { details: detailsToRemove } });
      return response.data;
    } catch (error) {
      console.error('Error al eliminar detalles:', error);
      throw error;
    }
  }

  //------------------------------------------------------


  return (
    <div>
      <div className=" container" style={{ textAlign: 'left' }}>
        <Breadcrumbs/>
      </div>
      <div className='container-md mt-5'>
        <div className={`modal fade ${isModalOpen ? 'show' : ''}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!isModalOpen} style={{ display: isModalOpen ? 'block' : 'none' }}>
          <div className="modal-dialog modal-xl">
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="modal-header" style={{ backgroundColor: "#008cba" }}>
                  <h5 className="modal-title text-white" id="exampleModalLabel">Ingreso de Paquetes</h5>
                  <button type="button" className="btn-close bg-white" onClick={() => {
                    cleanData(); // Limpia los campos del formulario
                    getData(); // Carga los datos actualizados
                    closeModal();
                  }} />
                </div>
                <div className="modal-body ">
                  <form id=' paquetesForm' onSubmit={actions}>
                    <div className="row">
                      <div className="col-md-5 border border-2 ms-3">
                        <div className="col-md-12">
                          <label htmlFor="validationCustom01" className="form-label">Nombre del Paquete Turístico</label>
                          <input
                            type="text"
                            className="form-control"
                            id="nombrePaqueteTuristico"
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
                            onChange={(e) => setReseñaPaqueteTuristico(e.target.value.toUpperCase())}
                          ></textarea>
                        </div>
                        <div className="row">
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
                        <div className="modal-footer border-5">
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => {
                              getData(); // Carga los datos actualizados
                              cleanData(); // Limpia los campos del formulario
                              closeModal();
                              document.getElementById("paquetesForm"); // Cierra el modal

                            }}
                            data-bs-dismiss="modal"
                          >
                            Cerrar
                          </button>
                          <button type="submit" className="btn btn-primary">Guardar Registro</button>
                          <button
                            type="button"
                            className="btn btn-success mt-2"
                            onClick={handleAddRow}
                          >
                            Agregar Detalles
                          </button>
                        </div>
                      </div>
                      <div className="col-md-6 border border-2 table-responsive container container-flex">
                        <table className="table table-hover mt-2">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Detalle de Paquete</th>

                              <th>Precio</th>
                              <th scope="col">Acción</th>
                            </tr>
                          </thead>
                          <tbody style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {detallesPaquetesTuristicos.map((detail, index) => (
                              <tr key={`${detail._id}-${index}`}>
                                <td>{index + 1}</td>
                                <td>
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="nombredetallesPaqueteTuristico"
                                    value={detail.nombredetallesPaqueteTuristico}
                                    onChange={(e) => {
                                      const updatedDetalles = [...detallesPaquetesTuristicos];
                                      updatedDetalles[index].nombredetallesPaqueteTuristico = e.target.value;
                                      setDetallesPaquetesTuristicos(updatedDetalles);
                                    }}
                                  />
                                </td>
                                <td className="col-3">
                                  <input
                                    className="form-control text-end"
                                    type="text"
                                    name="precioDetallesPaqueteTuristico"
                                    value={detail.precioDetallesPaqueteTuristico}
                                    onChange={(e) => {
                                      const updatedDetalles = [...detallesPaquetesTuristicos];
                                      updatedDetalles[index].precioDetallesPaqueteTuristico = e.target.value;
                                      setDetallesPaquetesTuristicos(updatedDetalles);
                                    }}
                                    placeholder="Precio"
                                  />
                                </td>
                                <td>
                                  <div className="btn-group btn-group-sm" role="group">
                                    <span className='btn btn-danger me-2' onClick={() => pullAll(detail._id)}>
                                      <i className="fa-solid fa-trash"></i>
                                    </span>
                                    <span className='btn btn-success' onClick={() => addToSet(detail._id)}>
                                      <i className="fa-solid fa-plus"></i> 
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>


                        </table>


                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


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
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div>
            <button type="button" className="btn btn-primary rounded-circle aling-end" style={{ backgroundColor: "#008cba" }} onClick={() => {
              setIsModalOpen(true); // Abre la modal al hacer clic
            }} title="Haga clic para agregar un nuevo paquete">< i className="fa-solid fa-plus fa-beat "></i></button>
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
                  <th scope="col" className="responsive-text">Destino</th>
                  <th scope="col" className="responsive-text">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(filteredPaquetes) && filteredPaquetes.map((item, i) => (
                  <tr key={item._id}>
                    <td className="responsive-text">{i + 1}</td>
                    <td className="responsive-text">{item.nombrePaqueteTuristico}</td>
                    <td className="responsive-text">{item.reseñaPaqueteTuristico}</td>
                    <td className="responsive-text">{item.valorPaqueteTuristico}</td>
                    <td className="responsive-text">{destinoNombres[item.destinos]}</td>
                    <td>
                      <div className="btn-group btn-group-sm" role="group">
                        <span className='btn btn-primary d-flex align-items-center me-2' onClick={() => editData(item)}>
                          <i className="fa-solid fa-pencil space-i"></i>
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
                  <strong>Destino:</strong> {item.destinos}<br />
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

  )
}

export default Paquetes