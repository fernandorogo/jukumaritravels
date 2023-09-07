import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Pagination from 'rc-pagination';
import "./TextResponsive.css";

const Destinos = () => {
  const [destinos, setDestinos] = useState([])
  const [nombreDestino, setnombreDestino] = useState('')
  const [ubicacion, setubicacion] = useState('')
  const [descripcionDestino, setdescripcionDestino] = useState('')

  const [edit, setEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDestinos, setfilteredDestinos] = useState([]);

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState('')



  useEffect(() => {
    getData(page);
    fetchDestinos();
  }, [page]);

  const cleanData = () => {
    setDestinos('')
    setnombreDestino('')
    setubicacion('')
    setdescripcionDestino('')

    setEdit(false);
  }

  const getData = async (pageCurrent) => {
    const { data } = await axios.get(`/api/destinos/list/?page=${pageCurrent}`);
    setDestinos(data.destinos.docs);
    setfilteredDestinos(data.destinos.docs);
    setPage(data.destinos.page);
    setTotalPages(data.destinos.totalPages);

  };

  const onchangePage = (page) => {
    getData(page)
  }



  const saveDestino = async () => {
    try {
      const newDestino = {
        nombreDestino,
        ubicacion,
        descripcionDestino
      }
      await axios.post('/api/destinos/', newDestino);
      cleanData();
      getData();
      closeModal();

      // SweetAlert2 para mostrar éxito
      Swal.fire({
        icon: 'success',
        title: 'Destino guardado exitosamente',
        showConfirmButton: false,
        timer: 1500
      });

      setTimeout(() => {
        getData();

      }, 1000);

    } catch (error) {
      if (error.response && !error.response.data.ok) {
        Swal.fire({
          icon: 'error',
          title: 'Error al guardar el destino',
          text: error.response.data.message
        });
      } else {
        console.log('error en saveDestino', error.message);
      }
    }
  }

  const updateDestino = async () => {
    try {
      const id = localStorage.getItem('id');
      const newDestino = {
        nombreDestino,
        ubicacion,
        descripcionDestino

      }

      const { data } = await axios.put('/api/destinos/' + id, newDestino);
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
      console.log('error en saveDestino', error.message);

    }
  }

  const editData = (item) => {
    setEdit(true);
    setnombreDestino(item.nombreDestino)
    setubicacion(item.ubicacion)
    setdescripcionDestino(item.descripcionDestino)

    localStorage.setItem('id', item._id);
    setIsModalOpen(true);

  }
  const closeModal = () => {
    setIsModalOpen(false);

  };
  const actions = (e) => {
    e.preventDefault();
    edit ? updateDestino() : saveDestino();

  };

  const deleteDestino = async (id) => {
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
          const { data } = await axios.delete('/api/destinos/' + id);
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
      console.log('error en deleteDestino', error.message);
    }
  }


  const fetchDestinos = async () => {
    fetch('api/destinos')
      .then(response => response.text())
      .catch(error => console.error('Error feching destinos:', error));
  };

  const searchFields = [
    'nombreDestino'
  ];

  const handleSearch = (e) => {
    const searchText = e.target.value;
    setSearchTerm(searchText);

    const filtered = destinos.filter((destino) => searchFields.some((field) => String(destino[field]).toLowerCase().includes(searchText.toLowerCase())
    )
    );
    setfilteredDestinos(filtered)
  }





  return (
    <div>
      {/* Inicio del formulario*/}
      <div className='container-md mt-5'>


        {/* <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"> */}
        <div className={`modal fade ${isModalOpen ? 'show' : ''}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!isModalOpen} style={{ display: isModalOpen ? 'block' : 'none' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header" style={{ backgroundColor: "#008cba" }}>
                  <h5 className="modal-title text-white" id="exampleModalLabel">Ingreso de Destinos</h5>
                  <button type="button" className="btn-close bg-white" onClick={() => {
                    cleanData(); // Limpia los campos del formulario
                    getData(); // Carga los datos actualizados
                    closeModal();
                  }} />
                </div>
                <div className="modal-body">
                  <form id='destinosForm' onSubmit={actions}>
                    <div className="col-md-12">
                      <label htmlFor="validationCustom01" className="form-label"> Nombre del Destino</label>
                      <input type="text" className="form-control" id="nombreDestino"
                        value={nombreDestino} onChange={(e) => setnombreDestino(e.target.value.toUpperCase())}
                        maxLength={20}
                        required />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="ubicacion" className="form-label">Ubicación</label>
                      <input type="text" className="form-control" id="ubicacion"
                        value={ubicacion}
                        onChange={(e) => setubicacion(e.target.value.toUpperCase())}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label for="exampleFormControlTextarea1" clasName="form-label">Descripcion del destino</label>
                      <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                        value={descripcionDestino}
                        onChange={(e) => setdescripcionDestino(e.target.value.toUpperCase())}
                        required></textarea>
                    </div>


                    <div className="modal-footer border-5">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                          getData(); // Carga los datos actualizados
                          cleanData(); // Limpia los campos del formulario
                          closeModal();
                          // Restablece el mensaje de error
                          document.getElementById('destinosForm').click(); // Cierra el modal
                        }}
                        data-bs-dismiss="modal"
                      >
                        Cerrar
                      </button>
                      <button type="submit" className="btn btn-primary">Guardar Registro</button>
                    </div>

                  </form>
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
                <i class="fa-solid fa-file-pdf me-2"></i>Pdf
              </Link>
              <Link className="dropdown-item" href="#">
                <i class="fa-solid fa-file-excel me-2"></i> Excel
              </Link>
              <div className="dropdown-divider"></div><Link className="dropdown-item" href="#"> Somem</Link>
            </div>

          </div>

          <div>
            <h6 className="text-primary fw-bold m-0 mt-1 text-start">Lista de Destinos</h6>
          </div>

          <div>
            <input className="form-control me-5" aria-label="Search"
              type="text"
              placeholder="Buscar destino..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div>
            <button type="button" className="btn btn-primary rounded-circle aling-end" style={{ backgroundColor: "#008cba" }} onClick={() => {
              setIsModalOpen(true);  // Abre la modal al hacer clic
            }} title="Haga clic para agregar un nuevo destino">< i className="fa-solid fa-plus fa-beat "></i></button>
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
                  <th scope="col" className="responsive-text">Nombre Destino</th>
                  <th scope="col" className="responsive-text">Ubicacion</th>
                  <th scope="col" className="responsive-text">Descripcion destino</th>

                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(filteredDestinos) && filteredDestinos.map((item, i) => (
                  <tr key={item._id}>
                    <td >{i + 1}</td>
                    <td className='responsive-text'>{item.nombreDestino}</td>
                    <td className='responsive-text'>{item.ubicacion}</td>
                    <td className='responsive-text'>{item.descripcionDestino}</td>

                    {/*<td>{DateTime.fromISO(item.fechanacimientoCliente).toFormat('dd/LL/yyyy')}</td>*/}



                    <td>
                      <div className="btn-group btn-group-sm" role="group">
                        <span className='btn btn-primary d-flex align-items-center me-2' onClick={() => editData(item)}
                          title="Editar">
                          <i className="fa-solid fa-pencil space-i"></i>
                        </span>
                        <span className='btn btn-danger d-flex align-items-center'
                          onClick={() => deleteDestino(item._id)} title="Eliminar"
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
          {Array.isArray(destinos) && destinos.map((item, i) => (
            <div key={item._id} className='card border-3'>
              {/* Contenido de la tarjeta */}
              <div className='card-body'>
                <h5 className='card-title'>Destino {i + 1}</h5>
                <p className='card-text'>
                  <strong>Nombre del destino:</strong> {item.nombreDestino}<br />
                  <strong>Ubicacion:</strong> {item.ubicacion}<br />
                  <strong>descripcion del Destino:</strong> {item.descripcionDestino}<br />

                </p>
                <div className='btn-group btn-group-xl'>
                  <span className='btn btn-primary d-flex align-items-center me-2'
                    onClick={() => editData(item)}
                  >
                    <i className="fa-solid fa-pencil space-i"></i>
                  </span>
                  <span className='btn btn-danger d-flex align-items-center'
                    onClick={() => deleteDestino(item._id)}
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
    </div >
  )
}

export default Destinos