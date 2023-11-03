import axios from 'axios';
import Pagination from 'rc-pagination';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Breadcrumbs from '../components/Breadcrumbs ';



const Proveedores = () => {
  const [proveedores, setProveedores] = useState([])
  const [documentoProveedor, setDocumentoProveedor] = useState('')
  const [razonsocialProveedor, setRazonsocialProveedor] = useState('')
  const [tipoProveedor, setTipoProveedor] = useState('')
  const [telefono1Proveedor, setTelefono1Proveedor] = useState('')
  const [telefono2Proveedor, setTelefono2Proveedor] = useState('')
  const [whatsappProveedor, setWhatsappProveedor] = useState('')
  const [correoelectronicoProveedor, setCorreoelectronicoProveedor] = useState('')
  const [direccion, setDireccion] = useState('')

  const [edit, setEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Paginacion
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState('')

 
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





  useEffect(() => {
    getData(page);
    obtenerPaises();
    //fetchProveedores();
  }, [page]);

  const cleanData = () => {
    setProveedores('')
    setDocumentoProveedor('')
    setRazonsocialProveedor('')
    setTipoProveedor('')
    setTelefono1Proveedor('')
    setTelefono2Proveedor('')
    setWhatsappProveedor('')
    setCorreoelectronicoProveedor('')
    setDireccion('')

    setPaisCliente('');
    setEstadoCliente('');
    setCiudadCliente('');
    
    setPaisSeleccionado('');
    setEstadoSeleccionado('');
    setCiudadSeleccionada('');


    setEdit(false);
  }

  const getData = async (pageCurrent) => {
    const { data } = await axios.get(`/api/proveedores/list/?page=${pageCurrent}`);
    setProveedores(data.proveedores);
    //setFilteredProveedores(data.proveedores.docs);
    setPage(data.proveedores.page);
    setTotalPages(data.proveedores.totalPages);
  };

  const onchangePage = (page) => {
    getData(page);
  }

  const saveProveedor = async () => {
    try {
      const newProveedor = {
        documentoProveedor,
        razonsocialProveedor,
        tipoProveedor,
        telefono1Proveedor,
        telefono2Proveedor,
        whatsappProveedor,
        correoelectronicoProveedor,
        direccion,

        paisCliente,
        estadoCliente,
        ciudadCliente,

      }
      await axios.post('/api/proveedores/', newProveedor);
      cleanData();
      getData();
      closeModal();

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
      console.log('error en saveProveedor', error.message);

    }
  }
  const updateProveedor = async () => {
    try {
      const id = localStorage.getItem('id');
      const newProveedor = {
        documentoProveedor,
        razonsocialProveedor,
        tipoProveedor,
        telefono1Proveedor,
        telefono2Proveedor,
        whatsappProveedor,
        correoelectronicoProveedor,
        direccion,
        paisCliente,
        estadoCliente,
        ciudadCliente,

      };

      const { data } = await axios.put('/api/proveedores/' + id, newProveedor);

      setPaisSeleccionado(paisCliente);
      setEstadoSeleccionado(estadoCliente);
      setCiudadSeleccionada(ciudadCliente);

      cleanData();
      getData();
      closeModal();
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
  const editData = (item) => {

    setEdit(true);
    setDocumentoProveedor(item.documentoProveedor)
    setRazonsocialProveedor(item.razonsocialProveedor)
    setTipoProveedor(item.tipoProveedor)
    setTelefono1Proveedor(item.telefono1Proveedor)
    setTelefono2Proveedor(item.telefono2Proveedor)
    setWhatsappProveedor(item.whatsappProveedor);
    setCorreoelectronicoProveedor(item.correoelectronicoProveedor)
    setDireccion(item.direccion)
    
    setPaisCliente(item.paisCliente || '');
    setEstadoCliente(item.estadoCliente || '');
    setCiudadCliente(item.ciudadCliente || '');

    localStorage.setItem('id', item._id);
    setIsModalOpen(true);

  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteProveedor = async (id) => {
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
          const { data } = await axios.delete('/api/proveedores/' + id);
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
      console.log('error en deleteProveedor', error.message);
    }
  }
  const actions = async (e) => {
    e.preventDefault();
    edit ? updateProveedor() : saveProveedor();
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






  return (
    <div>
      <div className=" container" style={{ textAlign: 'left' }}>
        <Breadcrumbs/>
      </div>
      {/* Inicio del formulario*/}
      <div className='container-md mt-5'>
        <div className={`modal fade ${isModalOpen ? 'show' : ''}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!isModalOpen} style={{ display: isModalOpen ? 'block' : 'none' }}>
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header" style={{ backgroundColor: "#008cba" }}>
                <h5 className="modal-title text-white" id="exampleModalLabel">Ingreso de Proveedores</h5>
                <button type="button" className="btn-close bg-white" onClick={() => {
                  cleanData(); // Limpia los campos del formulario
                  getData(); // Carga los datos actualizados
                  closeModal();
                }} />
              </div>
              <div className="modal-body">
                <form id='proveedorForm' onSubmit={actions}>
                  <div className="row g-3">
                  
                    <div className="col-md-3">
                      <label htmlFor="segundoNombre" className="form-label">Número de NIT </label>
                      <input type="number" className="form-control" id="segundoNombre"
                        value={documentoProveedor}
                        onChange={(e) => setDocumentoProveedor(e.target.value.toUpperCase())}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="primerApellido" className="form-label">Razón Social</label>
                      <input type="text" className="form-control" id="primerApellido"
                        value={razonsocialProveedor}
                        onChange={(e) => setRazonsocialProveedor(e.target.value.toUpperCase())}
                        required />
                    </div>
                   
                    <div className="col-md-3">
                      <label htmlFor="tipoproveedor" className="form-label">Tipo proveedor</label>
                      <input type="text" className="form-control" id="tipoproveedor"
                        value={tipoProveedor}
                        onChange={(e) => setTipoProveedor(e.target.value.toUpperCase())}
                        required
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="telefono1" className="form-label">Teléfono 1</label>
                      <input type="number" className="form-control" id="telefono1"
                        value={telefono1Proveedor}
                        onChange={(e) => setTelefono1Proveedor(e.target.value)}
                        required />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="telefono1" className="form-label">Teléfono 2</label>
                      <input type="number" className="form-control" id="telefono1"
                        value={telefono2Proveedor}
                        onChange={(e) => setTelefono2Proveedor(e.target.value)}
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="telefono1" className="form-label">Whatsapp</label>
                      <input type="number" className="form-control" id="telefono1"
                        value={whatsappProveedor}
                        onChange={(e) => setWhatsappProveedor(e.target.value)}
                        required />
                    </div>
                    
                    
                    
                    
                    <div className="col-md-3">
                      <label htmlFor="correoElectronico" className="form-label">Correo Electrónico</label>
                      <input type="email" className="form-control" id="correoElectronico"
                        value={correoelectronicoProveedor}
                        onChange={(e) => setCorreoelectronicoProveedor(e.target.value)}
                        required />
                    </div>

                    
                    <div className="col-md-3">
                      <label htmlFor="direccionPrincipal" className="form-label">País</label>
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
                          <option key={estados.idEstado} value={estados.idEstado}  >{estados.nombreEstado}</option>
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

                    <div className="col-md-3">
                      <label htmlFor="direccion" className="form-label">Dirección</label>
                      <input type="text" className="form-control" id="primerApellido"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value.toUpperCase())}
                        required />
                    </div>












                    
                    {/* ... (código existente) ... */}
                    <div className="modal-footer border-5">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                          getData(); // Carga los datos actualizados
                          cleanData(); // Limpia los campos del formulario
                          closeModal();
                     
                          document.getElementById("proveedorForm").click(); // Cierra el modal
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
                <i className="fa-solid fa-file-pdf me-2"></i>Pdf
              </Link>
              <Link className="dropdown-item" href="#">
                <i className="fa-solid fa-file-excel me-2"></i> Excel
              </Link>
              <div className="dropdown-divider"></div><Link className="dropdown-item" href="#"> Somem</Link>
            </div>
          </div>
          <div>
            <h6 className="text-primary fw-bold m-0 mt-1 text-start">Lista de Proveedores</h6>
          </div>
          <div>
            <input className="form-control me-5" aria-label="Search"
              type="text"
              placeholder="Buscar proveedor..."
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
                  <th scope="col" className="responsive-text">NIT</th>
                  <th scope="col" className="responsive-text">Razón Social</th>
                  <th scope="col" className="responsive-text">Tipo Proveedor</th>
                  <th scope="col" className="responsive-text">Télefono</th>
                  <th scope="col" className="responsive-text">Correo electrónico</th>
                  
                  <th scope="col" className="responsive-text">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(proveedores) && proveedores.map((item, i) => (
                  <tr key={item._id}>
                    <td className="responsive-text"> {i + 1}</td>
                    <td className="responsive-text"> {item.documentoProveedor} </td>
                    <td className="responsive-text"> {item.razonsocialProveedor} </td>
                    <td className="responsive-text"> {item.tipoProveedor} </td>
                    <td className="responsive-text"> {item.telefono1Proveedor} </td>
                    <td className="responsive-text"> {item.correoelectronicoProveedor} </td>
        
                    <td>
                      <div className="btn-group btn-group-sm" role="group">
                        <span className='btn btn-primary d-flex align-items-center me-2' onClick={() => editData(item)}>
                          <i className="fa-solid fa-pencil space-i"></i>
                        </span>
                        <span className='btn btn-danger d-flex align-items-center'
                          onClick={() => deleteProveedor(item._id)}
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
    
      {/* Mostrar tarjetas solo en dispositivos pequeños (móviles) */}
      <div className='d-md-none'>
        {Array.isArray(proveedores) && proveedores.map((item, i) => (
          <div key={item._id} className='card border-3'>
            {/* Contenido de la tarjeta */}
            <div className='card-body'>
              <h5 className='card-title'>Proveedor{i + 1}</h5>
              <p className='card-text'>
                <strong>Fecha </strong> {item.fechaReserva}<br />
                <strong>Fecha Salida:</strong> {item.fechaSalida}<br />
                <strong>Fecha de Regreso:</strong> {item.fechaLlegada}<br />
                <strong>Cliente:</strong> {item.cliente}<br />
                <strong></strong>
              </p>
              <div className='btn-group btn-group-xl'>
                <span className='btn btn-primary d-flex align-items-center me-2'  onClick={() => editData(item)}>
                  <i className="fa-solid fa-pencil space-i"></i>
                </span>
                <span className='btn btn-danger d-flex align-items-center'
                  onClick={() => deleteProveedor(item._id)}
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
        </div >
    
    </div>



  )
}

export default Proveedores