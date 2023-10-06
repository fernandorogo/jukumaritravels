import axios from 'axios';
import Pagination from 'rc-pagination';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Breadcrumbs from '../components/Breadcrumbs ';



const Proveedores = () => {
  const [proveedores, setProveedores] = useState([])
  const [tipodocumentoProveedor, setTipodocumentoProveedor] = useState('NIT')
  const [documentoProveedor, setDocumentoProveedor] = useState('')
  const [razonsocialProveedor, setRazonsocialProveedor] = useState('')
  const [nombre1Proveedor, setNombre1Proveedor] = useState('')
  const [nombre2Proveedor, setNombre2Proveedor] = useState('')
  const [apellido1Proveedor, setApellido1Proveedor] = useState('')
  const [apellido2Proveedor, setApellido2Proveedor] = useState('')
  const [tipoProveedor, setTipoProveedor] = useState('')
  const [telefono1Proveedor, setTelefono1Proveedor] = useState('')
  const [telefono2Proveedor, setTelefono2Proveedor] = useState('')
  const [whatsappProveedor, setWhatsappProveedor] = useState('')
  const [correoelectronicoProveedor, setCorreoelectronicoProveedor] = useState('')

  const [edit, setEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Paginacion
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState('')

 






  useEffect(() => {
    getData(page);
    //fetchProveedores();
  }, [page]);

  const cleanData = () => {
    setProveedores('')
    setTipodocumentoProveedor('')
    setDocumentoProveedor('')
    setRazonsocialProveedor('')
    setNombre1Proveedor('')
    setNombre2Proveedor('')
    setApellido1Proveedor('')
    setApellido2Proveedor('')
    setTipoProveedor('')
    setTelefono1Proveedor('')
    setTelefono2Proveedor('')
    setWhatsappProveedor('')
    setCorreoelectronicoProveedor('')



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
        tipodocumentoProveedor,
        documentoProveedor,
        razonsocialProveedor,
        nombre1Proveedor,
        nombre2Proveedor,
        apellido1Proveedor,
        apellido2Proveedor,
        tipoProveedor,
        telefono1Proveedor,
        telefono2Proveedor,
        whatsappProveedor,
        correoelectronicoProveedor,

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
        tipodocumentoProveedor,
        documentoProveedor,
        razonsocialProveedor,
        nombre1Proveedor,
        nombre2Proveedor,
        apellido1Proveedor,
        apellido2Proveedor,
        tipoProveedor,
        telefono1Proveedor,
        telefono2Proveedor,
        whatsappProveedor,
        correoelectronicoProveedor,

      };

      const { data } = await axios.put('/api/proveedores/' + id, newProveedor);

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
    setTipodocumentoProveedor(item.tipodocumentoProveedor)
    setDocumentoProveedor(item.documentoProveedor)
    setRazonsocialProveedor(item.razonsocialProveedor)
    setNombre1Proveedor(item.nombre1Proveedor)
    setNombre2Proveedor(item.nombre2Proveedor)
    setApellido1Proveedor(item.apellido1Proveedor)
    setApellido2Proveedor(item.apellido2Proveedor);
    setTipoProveedor(item.tipoproveedor)
    setTelefono1Proveedor(item.telefono1Proveedor)
    setTelefono2Proveedor(item.telefono2Proveedor)
    setWhatsappProveedor(item.whatsappProveedor);
    setCorreoelectronicoProveedor(item.correoelectronicoProveedor)

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
                      <label htmlFor="tipoDocumento" className="form-label">Tipo Documento</label>
                      <select className="form-select" id="tipoDocumento"
                        value={tipodocumentoProveedor}
                        onChange={(e) => setTipodocumentoProveedor(e.target.value)}
                        required>
                        <option disabled value="">Elige...</option>
                        <option value="CC">CEDULA DE CIUDADANIA</option>
                        <option value="NIT">NIT</option>
                      </select>
                      <div className="invalid-feedback">Selecciona un estado válido.</div>
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="segundoNombre" className="form-label">Documento </label>
                      <input type="number" className="form-control" id="segundoNombre"
                        value={documentoProveedor}
                        onChange={(e) => setDocumentoProveedor(e.target.value.toUpperCase())}
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="primerApellido" className="form-label">Razon Social</label>
                      <input type="text" className="form-control" id="primerApellido"
                        value={razonsocialProveedor}
                        onChange={(e) => setRazonsocialProveedor(e.target.value.toUpperCase())}
                        required />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="segundoApellido" className="form-label">Primer Nombre</label>
                      <input type="text" className="form-control" id="segundoApellido"
                        value={nombre1Proveedor}
                        onChange={(e) => setNombre1Proveedor(e.target.value.toUpperCase())}
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="segundoApellido" className="form-label">Segundo Nombre</label>
                      <input type="text" className="form-control" id="segundoApellido"
                        value={nombre2Proveedor}
                        onChange={(e) => setNombre2Proveedor(e.target.value.toUpperCase())}
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="segundoApellido" className="form-label">Primer Apellido</label>
                      <input type="text" className="form-control" id="segundoApellido"
                        value={apellido1Proveedor}
                        onChange={(e) => setApellido1Proveedor(e.target.value.toUpperCase())}
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="segundoApellido" className="form-label">Segundo Apellido</label>
                      <input type="text" className="form-control" id="segundoApellido"
                        value={apellido2Proveedor}
                        onChange={(e) => setApellido2Proveedor(e.target.value.toUpperCase())}
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="segundoApellido" className="form-label">Tipo proveedor</label>
                      <input type="text" className="form-control" id="segundoApellido"
                        value={tipoProveedor}
                        onChange={(e) => setTipoProveedor(e.target.value.toUpperCase())}
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="telefono1" className="form-label">Telefono 1</label>
                      <input type="number" className="form-control" id="telefono1"
                        value={telefono1Proveedor}
                        onChange={(e) => setTelefono1Proveedor(e.target.value)}
                        required />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="telefono1" className="form-label">Telefono 2</label>
                      <input type="number" className="form-control" id="telefono1"
                        value={telefono2Proveedor}
                        onChange={(e) => setTelefono2Proveedor(e.target.value)}
                        required />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="telefono1" className="form-label">Whatsapp</label>
                      <input type="number" className="form-control" id="telefono1"
                        value={whatsappProveedor}
                        onChange={(e) => setWhatsappProveedor(e.target.value)}
                        required />
                    </div>
                    
                    
                    
                    
                    <div className="col-md-3">
                      <label htmlFor="correoElectronico" className="form-label">Correo Electronico</label>
                      <input type="email" className="form-control" id="correoElectronico"
                        value={correoelectronicoProveedor}
                        onChange={(e) => setCorreoelectronicoProveedor(e.target.value)}
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
                  <th scope="col" className="responsive-text">Tipo documento</th>
                  <th scope="col" className="responsive-text">Documento</th>
                  <th scope="col" className="responsive-text">Razon Social</th>
                  <th scope="col" className="responsive-text">Primer Nombre</th>
                  <th scope="col" className="responsive-text">Segundo Nombre</th>
                  <th scope="col" className="responsive-text">Primer Apellido</th>
                  <th scope="col" className="responsive-text">Segundo Apellido</th>
                  <th scope="col" className="responsive-text">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(proveedores) && proveedores.map((item, i) => (
                  <tr key={item._id}>
                    <td className="responsive-text"> {i + 1}</td>
                    <td className="responsive-text"> {item.tipodocumentoProveedor} </td>
                    <td className="responsive-text"> {item.documentoProveedor} </td>
                    <td className="responsive-text"> {item.razonsocialProveedor} </td>
                    <td className="responsive-text"> {item.nombre1Proveedor}</td>
                    <td className="responsive-text"> {item.nombre2Proveedor}</td>
                    <td className="responsive-text"> {item.apellido1Proveedor}</td>
                    <td className="responsive-text"> {item.apellido2Proveedor}</td>
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
                <span className='btn btn-primary d-flex align-items-center me-2'>
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