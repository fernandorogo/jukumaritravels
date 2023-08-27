import axios from 'axios';
import { DateTime } from 'luxon';
import Pagination from 'rc-pagination';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import "./TextResponsive.css";

const Cliente = () => {
  const [clientes, setClientes] = useState([])
  //Linea1
  const [nombre1Cliente, setnombre1Cliente] = useState('')
  const [nombre2Cliente, setnombre2Cliente] = useState('')
  const [apellido1Cliente, setapellido1Cliente] = useState('')
  const [apellido2Cliente, setapellido2Cliente] = useState('')
  //Linea2
  const [tipodocumentoCliente, settipodocumentoCliente] = useState('')
  const [documentoCliente, setdocumentoCliente] = useState('')
  const [fechanacimientoCliente, setfechanacimientoCliente] = useState('');
  const [correoelectronicoCliente, setcorreoelectronicoCliente] = useState('')
  //Linea3
  const [telefono1Cliente, settelefono1Cliente] = useState('')
  const [telefono2Cliente, settelefono2Cliente] = useState('')
  const [direccionCliente, setdireccionCliente] = useState('')
  //Linea4 campos para almacenar el cambio de estado de la ubicacion del cliente
  const [paisCliente, setPaisCliente] = useState('');
  const [estadoCliente, setEstadoCliente] = useState('');
  const [ciudadCliente, setCiudadCliente] = useState('');
  //----------------------------------------------------------------
  // Estos estados y cambios de estado son relacionados con los Select o listas desplegables
  const [paises, setPaises] = useState([]);
  const [estados, setEstados] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [paisSeleccionado, setPaisSeleccionado] = useState("");
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("");
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState("");
  //-----------------------------------------------------------------
  const [esMenorEdad, setEsMenorEdad] = useState('NO'); // Puedes inicializarlo según tus necesidades
  //Linea5
  const [parentezcoCliente, setparentezcoCliente] = useState('')
  const [otroParentezco, setOtroParentezco] = useState('');
  const [documentoTitular, setdocumentoTitular] = useState('')
  //Parte de las funciones
  const [otroParentezcoVisible, setOtroParentezcoVisible] = useState(false);
  const [validacionDocumento, setValidacionDocumento] = useState(null); // Estado para almacenar el resultado de la validación
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [fechaError, setFechaError] = useState(''); //Validar la fecha de nacimiento
  //Bandera
  const [edit, setEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Paginacion
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState('')
  //Search
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClientes, setFilteredClientes] = useState([]); // Aquí almacenarás los clientes filtrados


  useEffect(() => {
    getData(page);
    obtenerPaises();
    fetchClientes();
  }, [page]);

  // Limpiar campos del formulario

  const cleanData = () => {
    setClientes('')
    setnombre1Cliente('')
    setnombre2Cliente('')
    setapellido1Cliente('')
    setapellido2Cliente('')
    settipodocumentoCliente('')
    setdocumentoCliente('')
    setfechanacimientoCliente('');
    setcorreoelectronicoCliente('')
    settelefono1Cliente('')
    settelefono2Cliente('')
    setdireccionCliente('')
    setPaisCliente('');
    setEstadoCliente('');
    setCiudadCliente('');
    setparentezcoCliente('')
    setOtroParentezco('')
    setdocumentoTitular('')

    setPaisSeleccionado('');
    setEstadoSeleccionado('');
    setCiudadSeleccionada('');



    setEdit(false);
  }

  const getData = async (pageCurrent) => {
    const { data } = await axios.get(`/api/clientes/list/?page=${pageCurrent}`);
    setClientes(data.clientes.docs);
    setFilteredClientes(data.clientes.docs);
    setPage(data.clientes.page);
    setTotalPages(data.clientes.totalPages);
  };

  const onchangePage = (page) => {
    getData(page);
  }

  // Guardar valores del formulario

  const saveCliente = async () => {
    try {
      const newCliente = {
        nombre1Cliente,
        nombre2Cliente,
        apellido1Cliente,
        apellido2Cliente,

        tipodocumentoCliente,
        documentoCliente,
        fechanacimientoCliente,
        correoelectronicoCliente,

        telefono1Cliente,
        telefono2Cliente,
        direccionCliente,

        paisCliente,
        estadoCliente,
        ciudadCliente,

        parentezcoCliente,
        otroParentezco,
        documentoTitular: documentoTitular  // Usa el valor validado

      }
      await axios.post('/api/clientes/', newCliente);
      cleanData();
      getData();

      // SweetAlert2 para mostrar éxito
      Swal.fire({
        icon: 'success',
        title: 'El Cliente a sido registrado con exito',
        showConfirmButton: false,
        timer: 1500
      });

      setTimeout(() => {
        getData(); // Recargar los datos después de un breve tiempo
      }, 1000); // Esperar 1 segundo antes de recargar


    } catch (error) {
      if (!error.response.data.ok) {
        return alert(error.response.data.message)
      }
      console.log('error en saveCliente', error.message);

    }
  }

  // Actualziar cliente registrado

  const updateUser = async () => {
    try {
      const id = localStorage.getItem('id');
      const newCliente = {
        nombre1Cliente,
        nombre2Cliente,
        apellido1Cliente,
        apellido2Cliente,
        tipodocumentoCliente,
        documentoCliente,
        fechanacimientoCliente,
        correoelectronicoCliente,
        telefono1Cliente,
        telefono2Cliente,
        direccionCliente,
        paisCliente,
        estadoCliente,
        ciudadCliente,
        parentezcoCliente,
        otroParentezco,
        documentoTitular: documentoTitular  // Usa el valor validado
      };

      const { data } = await axios.put('/api/clientes/' + id, newCliente);
      // Actualizar el estado de fechanacimientoCliente si es necesario
      setfechanacimientoCliente(newCliente.fechanacimientoCliente); // Asegúrate de que esto actualice el estado correctamente

      setPaisSeleccionado(paisCliente);
      setEstadoSeleccionado(estadoCliente);
      setCiudadSeleccionada(ciudadCliente);

      cleanData();
      getData();
      // SweetAlert2 para mostrar éxito
      Swal.fire({
        icon: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      if (!error.response.data.ok) {
        return alert(error.response.data.message)
      }
      console.log('error en saveCliente', error.message);
    }
  }

  // Sirve para almacenar los campos editables antes de guardar

  const editData = (item) => {

    setEdit(true);
    setnombre1Cliente(item.nombre1Cliente)
    setnombre2Cliente(item.nombre2Cliente)
    setapellido1Cliente(item.apellido1Cliente)
    setapellido2Cliente(item.apellido2Cliente)
    settipodocumentoCliente(item.tipodocumentoCliente)
    setdocumentoCliente(item.documentoCliente)
    setfechanacimientoCliente(item.fechanacimientoCliente);
    setcorreoelectronicoCliente(item.correoelectronicoCliente)
    settelefono1Cliente(item.telefono1Cliente)
    settelefono2Cliente(item.telefono2Cliente)
    setdireccionCliente(item.direccionCliente)
    setPaisCliente(item.paisCliente);
    setEstadoCliente(item.estadoCliente);
    setCiudadCliente(item.ciudadCliente);
    setparentezcoCliente(item.parentezcoCliente)
    setOtroParentezco(item.Otroparentezco)
    setdocumentoTitular(item.documentoTitular)

    // Configurar los valores de selección de país, estado y ciudad
    setPaisSeleccionado(item.paisCliente);
    setEstadoSeleccionado(item.estadoCliente);
    setCiudadSeleccionada(item.ciudadCliente);

    localStorage.setItem('id', item._id);
    setIsModalOpen(true);

  };

  // Función para cerrar el modal de edición
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Elimina el cliente por Id

  const deleteCliente = async (id) => {
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
          const { data } = await axios.delete('/api/clientes/' + id);
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
      console.log('error en deleteCliente', error.message);
    }
  }

  // Esta funcion permite cambiar el estado del formulario si es nuevo se guarda si ya existe se actualiza

  const actions = async (e) => {
    e.preventDefault();
    edit ? updateUser() : saveCliente();
  };

  // Esta funcion permite selccionar la opcion de menor edad y asi mostrar los imput correspondientes

  const handleEsMenorEdadChange = (e) => {
    setEsMenorEdad(e.target.value);
  };


  // Esta funcion permite validar la fecha de nacimiento, esta no puede ser mayor a la fecha actual.

  const handleFechaChange = (e) => {
    const selectedDate = DateTime.fromISO(e.target.value);
    const currentDate = DateTime.now();

    if (selectedDate > currentDate) {
      setFechaError('La fecha no puede ser futura.');
    } else {
      setFechaError('');
    }

    setfechanacimientoCliente(e.target.value);
  };

  // Esta funcion da el formato de fecha de luxon https://moment.github.io/luxon

  const formattedDate = DateTime.fromISO(fechanacimientoCliente).toFormat('yyyy-MM-dd');

  //Esta funcion permite que al seleccionar la opcion Otro en la listaa de parentesco, se muestre el input de otro

  const handleParentezcoChange = (e) => {
    const selectedValue = e.target.value;
    setparentezcoCliente(selectedValue);
    if (selectedValue === 'Otro') {
      setOtroParentezcoVisible(true);
    } else {
      setOtroParentezcoVisible(false);
    }
  };

  // Esta funcion permite hacer una consulta Get al servidor buscando un id de cliente

  const fetchClientes = async () => {
    fetch('/api/clientes')
      .then(response => response.text())
      .catch(error => console.error('Error fetching clientes:', error));
  };

  // Este codigo valida si el documento del Titular exite en la base de datos de Clientes

  const handleDocumentoTitularChange = async (e) => {
    const value = e.target.value;
    setdocumentoTitular(value);

    try {
      const response = await axios.get(`/api/clientes/verificar/${value}`);
      if (response.data.exists) {
        setValidacionDocumento(true);
        setNombreCompleto(response.data.nombreCompleto);
      } else {
        setValidacionDocumento(false);
        setNombreCompleto('');
      }
    } catch (error) {
      console.error('Error al validar el documento:', error);
      setValidacionDocumento(false); // Manejar el error estableciendo validación en false
      setNombreCompleto('');
    }
  };



  const obtenerPaises = async () => {
    try {
      const response = await axios.get("/api/paises/listall");
      console.log("Lista de paises:", response);
      setPaises(response.data.paises);
    } catch (error) {
      console.error("Error al obtener la lista de países:", error);
    }
  };

  const handlePaisChange = (paisId) => {
    setPaisSeleccionado(paisId);
    setPaisCliente(paisId); // Almacenar en paisCliente
    obtenerEstadosPorPais(paisId);
  };

  const handleEstadoChange = (estadoId) => {
    setEstadoSeleccionado(estadoId);
    setEstadoCliente(estadoId); // Almacenar en estadoCliente
    obtenerCiudadesPorEstado(estadoId);
  };

  const handleCiudadChange = (ciudadId) => {
    setCiudadSeleccionada(ciudadId);
    setCiudadCliente(ciudadId); // Almacenar en ciudadCliente
  };

  const obtenerEstadosPorPais = async (paisId) => {
    try {
      const response = await axios.get(`/api/paises/listid/${paisId}`);
      setEstados(response.data.estados || []);
      setEstadoSeleccionado('');
      setCiudadSeleccionada('');
    } catch (error) {
      console.error("Error al obtener los estados por país:", error);
      setEstados([]);
    }
  };

  const obtenerCiudadesPorEstado = async (estadoId) => {
    try {
      const response = await axios.get(`/api/estados/listid/${estadoId}`);
      setCiudades(response.data.ciudades || []);
      setCiudadSeleccionada('');
    } catch (error) {
      console.error("Error al obtener las ciudades por estado", error);
      setCiudades([]);
    }
  };


  //Mi filtro
  const searchFields = [
    'nombre1Cliente',
    'nombre2Cliente',
    'apellido1Cliente',
    'apellido2Cliente',
    'documentoCliente',
    'fechanacimientoCliente',
    'correoelectronicoCliente',

    // Agrega más campos aquí
  ];

  const handleSearch = (event) => {
    const searchText = event.target.value;
    setSearchTerm(searchText);

    // Filtra los clientes en base a los campos de búsqueda definidos
    const filtered = clientes.filter((cliente) =>
      searchFields.some((field) =>
        String(cliente[field]).toLowerCase().includes(searchText.toLowerCase())
      )
    );

    setFilteredClientes(filtered);
  };
















  return (
    <div>
      {/* Inicio del formulario*/}
      <div className='container-md mt-5'>

        {/*<button type="button" className="btn btn-primary" style={{ backgroundColor: "#008cba" }} onClick={() => {
          setIsModalOpen(true); // Abre la modal al hacer clic
        }}>
          < i className="fa-solid fa-plus fa-beat fa-lg me-2" style={{ color: "#ffffff" }}></i>CLIENTES
      </button>*/}

        {/* <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"> */}
        <div className={`modal fade ${isModalOpen ? 'show' : ''}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!isModalOpen} style={{ display: isModalOpen ? 'block' : 'none' }}>
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header" style={{ backgroundColor: "#008cba" }}>
                <h5 className="modal-title text-white" id="exampleModalLabel">Ingreso de Clientes</h5>
                <button type="button" className="btn-close bg-white" onClick={() => {
                  cleanData(); // Limpia los campos del formulario
                  getData(); // Carga los datos actualizados
                  closeModal();
                }} />
              </div>
              <div className="modal-body">
                <form id='clienteForm' onSubmit={actions}>
                  <div className="row g-3">
                    <div className="col-md-3">
                      <label htmlFor="primerNombre" className="form-label">Primer Nombre</label>
                      <input type="text" className="form-control" id="primerNombre"
                        value={nombre1Cliente}
                        onChange={(e) => setnombre1Cliente(e.target.value.toUpperCase())}
                        maxLength={20}
                        required
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="segundoNombre" className="form-label">Segundo Nombre</label>
                      <input type="text" className="form-control" id="segundoNombre"
                        value={nombre2Cliente}
                        onChange={(e) => setnombre2Cliente(e.target.value.toUpperCase())}
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="primerApellido" className="form-label">Primer Apellido</label>
                      <input type="text" className="form-control" id="primerApellido"
                        value={apellido1Cliente}
                        onChange={(e) => setapellido1Cliente(e.target.value.toUpperCase())}
                        required />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="segundoApellido" className="form-label">Segundo Apellido</label>
                      <input type="text" className="form-control" id="segundoApellido"
                        value={apellido2Cliente}
                        onChange={(e) => setapellido2Cliente(e.target.value.toUpperCase())}
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="tipoDocumento" className="form-label">Tipo Documento</label>
                      <select className="form-select" id="tipoDocumento"
                        value={tipodocumentoCliente}
                        onChange={(e) => settipodocumentoCliente(e.target.value)}
                        required>
                        <option disabled value="">Elige...</option>
                        <option value="RC">REGISTRO CIVIL</option>
                        <option value="TI">TARJETA DE IDENTIAD</option>
                        <option value="CC">CEDULA DE CIUDADANIA</option>
                        <option value="PASS">PASSAPORTE</option>
                        <option value="CE">CEDULA DE EXTRANJERIA</option>
                      </select>
                      <div className="invalid-feedback">Selecciona un estado válido.</div>
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="numIdentificacion" className="form-label">Numero de Identificación</label>
                      <input type="text" className="form-control" id="numIdentificacion"
                        value={documentoCliente}
                        onChange={(e) => setdocumentoCliente(e.target.value)}
                        required />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento</label>
                      <input
                        type="date"
                        className="form-control"
                        id="fechaNacimiento"
                        value={formattedDate}
                        onChange={handleFechaChange}
                        required
                      />
                      {fechaError && <p className="text-danger">{fechaError}</p>}
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="correoElectronico" className="form-label">Correo Electronico</label>
                      <input type="email" className="form-control" id="correoElectronico"
                        value={correoelectronicoCliente}
                        onChange={(e) => setcorreoelectronicoCliente(e.target.value)}
                        required />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="telefono1" className="form-label">Telefono 1</label>
                      <input type="text" className="form-control" id="telefono1"
                        value={telefono1Cliente}
                        onChange={(e) => settelefono1Cliente(e.target.value)}
                        required />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="telefono2" className="form-label">Telefono 2</label>
                      <input type="text" className="form-control" id="telefono2"
                        value={telefono2Cliente}
                        onChange={(e) => settelefono2Cliente(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="direccionPrincipal" className="form-label">Dirección principal</label>
                      <input type="text" className="form-control" id="direccionPrincipal"
                        value={direccionCliente}
                        onChange={(e) => setdireccionCliente(e.target.value.toUpperCase())}
                        required
                      />
                      <div className="invalid-feedback">Proporciona una dirección válida.</div>
                    </div>

                    {/*Aqui inicia los select de Ciudad, Estado y Pais */}
                    <div className="col-md-3">
                      <label htmlFor="direccionPrincipal" className="form-label">Pais</label>
                      <select className="form-select" value={edit ? paisCliente : paisSeleccionado} onChange={(e) => handlePaisChange(e.target.value)}>
                        <option value="">Selecciona un país</option>
                        {paises.map((paises) => (
                          <option key={paises.idPais} value={paises.idPais}>{paises.nombrePais}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="direccionPrincipal" className="form-label">Estado</label>
                      <select className="form-select" value={edit ? estadoCliente : estadoSeleccionado} onChange={(e) => handleEstadoChange(e.target.value)}>
                        <option value="">Selecciona un estado</option>
                        {estados.map((estados) => (
                          <option key={estados.idEstado} value={estados.idEstado}>{estados.nombreEstado}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="direccionPrincipal" className="form-label">Ciudad</label>
                      <select className="form-select" value={edit ? ciudadCliente : ciudadSeleccionada} onChange={(e) => handleCiudadChange(e.target.value)}>
                        <option value="">Selecciona una ciudad</option>
                        {ciudades.map((ciudades) => (
                          <option key={ciudades.idCiudad} value={ciudades.idCiudad}>{ciudades.nombreCiudad}</option>
                        ))}
                      </select>
                    </div>




                    {/* ... (código existente) ... */}
                    <div className="col-md-3">
                      <label htmlFor="esMenorEdad" className="form-label">Es menor de edad</label>
                      <select className="form-select" id="esMenorEdad" value={esMenorEdad} onChange={handleEsMenorEdadChange} required>
                        <option defaultValue disabled value="">Elige...</option>
                        <option value="SI">SI</option>
                        <option value="NO">NO</option>
                      </select>
                      <div className="invalid-feedback">Selecciona un estado válido.</div>
                    </div>
                    {esMenorEdad === 'SI' && (
                      <>
                        <div className="col-md-3 mb-3">
                          <label htmlFor="parentezco" className="form-label">Parentesco (si es menor de edad)</label>
                          <select className="form-select" id="parentezco" value={parentezcoCliente} onChange={handleParentezcoChange} required>
                            <option defaultValue disabled value="">Elige...</option>
                            <option>Madre</option>
                            <option>Padre</option>
                            <option>Hermano mayor de edad</option>
                            <option>Tutor legal</option>
                            <option>Otro</option>
                          </select>
                          <div className="invalid-feedback">Selecciona un estado válido.</div>
                        </div>
                        {otroParentezcoVisible && (
                          <div className="col-md-3 mb-3">
                            <label htmlFor="otroParentezco" className="form-label">¿Cuál?</label>
                            <input
                              type="text"
                              className="form-control"
                              id="otroParentezco"
                              value={otroParentezco}
                              onChange={(e) => setOtroParentezco(e.target.value.toUpperCase())}
                              required
                            />
                          </div>
                        )}
                        <div className="col-md-3 mb-3">
                          <label htmlFor="documentoTitular" className="form-label">Documento del Responsable</label>
                          <input
                            type="text"
                            className={`form-control ${validacionDocumento === true ? 'is-valid' : validacionDocumento === false ? 'is-invalid' : ''}`}
                            id="documentoTitular"
                            value={documentoTitular}
                            onBlur={handleDocumentoTitularChange} // Cambio de evento a onBlur
                            onChange={(e) => setdocumentoTitular(e.target.value)}
                            required
                          />
                          {validacionDocumento === false && ( // Mostrar validación solo si es inválido
                            <div className="invalid-feedback">Documento no válido.</div>
                          )}
                          {validacionDocumento === true && ( // Mostrar validación en verde si es válido
                            <div className="valid-feedback">Documento válido.</div>
                          )}
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="documentoTitular" className="form-label">Responsable del Menor</label>
                          <input type="text"
                            className="form-control"
                            value={nombreCompleto}
                          />
                        </div>
                      </>
                    )}
                    {/* ... (código existente) ... */}

                    <div className="modal-footer border-5">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                          getData(); // Carga los datos actualizados
                          cleanData(); // Limpia los campos del formulario
                          closeModal();
                          setFechaError(''); // Restablece el mensaje de error
                          document.getElementById("clienteForm").click(); // Cierra el modal
                        }}
                        data-bs-dismiss="modal"
                      >
                        Cerrar
                      </button>
                      <button type="submit" className="btn btn-primary">Guardar Registro</button>
                    </div>
                  </div>
                </form>
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
                <i class="fa-solid fa-file-pdf me-2"></i>Pdf
              </Link>
              <Link className="dropdown-item" href="#">
                <i class="fa-solid fa-file-excel me-2"></i> Excel
              </Link>
              <div className="dropdown-divider"></div><Link className="dropdown-item" href="#"> Somem</Link>
            </div>
          </div>
          <div>
            <h6 className="text-primary fw-bold m-0 mt-1 text-start">Lista de Clientes</h6>
          </div>
          
          <div>
            <input className="form-control me-5" aria-label="Search"
              type="text"
              placeholder="Buscar cliente..."
              value={searchTerm}
              onChange={handleSearch}
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
                  <th scope="col-2" className="responsive-text">Nombre1</th>
                  <th scope="col" className="responsive-text">Nombre2</th>
                  <th scope="col" className="responsive-text">Apellido1</th>
                  <th scope="col" className="responsive-text">Apellido2</th>
                  <th scope="col" className="responsive-text">Tipo</th>
                  <th scope="col" className="responsive-text">Documento</th>
                  <th scope="col" className="responsive-text">Email</th>
                  <th scope="col" className="responsive-text">Telefono1</th>
                  <th scope="col" className="responsive-text">Titular</th>
                  {/*<th scope="col">F Nacimiento</th>*/}
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(filteredClientes) && filteredClientes.map((item, i) => (
                  <tr key={item._id}>
                    <td className="responsive-text">{i + 1}</td>
                    <td className="responsive-text">{item.nombre1Cliente}</td>
                    <td className="responsive-text">{item.nombre2Cliente}</td>
                    <td className="responsive-text">{item.apellido1Cliente}</td>
                    <td className="responsive-text">{item.apellido2Cliente}</td>
                    <td className="responsive-text">{item.tipodocumentoCliente}</td>
                    <td className="responsive-text">{item.documentoCliente}</td>
                    <td className="responsive-text">{item.correoelectronicoCliente}</td>
                    <td className="responsive-text">{item.telefono1Cliente}</td>
                    <td className="responsive-text">{item.documentoTitular}</td>
                    {/*<td>{DateTime.fromISO(item.fechanacimientoCliente).toFormat('dd/LL/yyyy')}</td>*/}



                    <td>
                      <div className="btn-group btn-group-sm" role="group">
                        <span className='btn btn-primary d-flex align-items-center me-2' onClick={() => editData(item)}>
                          <i className="fa-solid fa-pencil space-i"></i>
                        </span>
                        <span className='btn btn-danger d-flex align-items-center'
                          onClick={() => deleteCliente(item._id)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </span>
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
          {Array.isArray(clientes) && clientes.map((item, i) => (
            <div key={item._id} className='card border-3'>
              {/* Contenido de la tarjeta */}
              <div className='card-body'>
                <h5 className='card-title'>Cliente {i + 1}</h5>
                <p className='card-text'>
                  <strong>Nombre1:</strong> {item.nombre1Cliente}<br />
                  <strong>Nombre2:</strong> {item.nombre2Cliente}<br />
                  <strong>Apellido1:</strong> {item.apellido1Cliente}<br />
                  <strong>Apellido2:</strong> {item.apellido2Cliente}<br />
                  <strong>Tipo Doc:</strong> {item.tipodocumentoCliente}<br />
                  <strong>Documento:</strong> {item.documentoCliente}<br />
                  <strong>Telefono:</strong> {item.telefono1Cliente}<br />
                  <strong>Email:</strong> {item.correoelectronicoCliente}
                  <strong>Doc Titular:</strong> {item.documentoTitular}
                  <strong></strong>
                </p>
                <div className='btn-group btn-group-xl'>
                  <span className='btn btn-primary d-flex align-items-center me-2'>
                    <i className="fa-solid fa-pencil space-i"></i>
                  </span>
                  <span className='btn btn-danger d-flex align-items-center'
                    onClick={() => deleteCliente(item._id)}
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
            onChange={onchangePage}
          />
        </div>
      </div>

      {/* Fin de la tabla de Clientes*/}





    </div >
  )
}

export default Cliente