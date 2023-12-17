import axios from 'axios';
import Pagination from 'rc-pagination';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import "./TextResponsive.css";

const Destinos = () => {
  const [destinos, setDestinos] = useState([])
  const { id } = useParams();
  const [nombreDestino, setNombreDestino] = useState('')
  const [ubicacionDestino, setUbicacionDestino] = useState('')
  const [descripcionDestino, setDescripcionDestino] = useState('')
  const [image, setImage] = useState('')
  const [preview, setPreview] = useState('')
  const [uploadState, setUploadState] = useState(0)
  const [loading, setLoading] = useState(false)

  const [edit, setEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDestinos, setfilteredDestinos] = useState([]);

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState('')


  const options = {
    onUploadProgress: (ProgressEvent) => {
      const { loaded, total } = ProgressEvent;
      let percent = parseInt((loaded * 100) / total);
      setUploadState(percent);
    },
  };


  useEffect(() => {
    const searchPostById = async () => {
      try {
        const { data } = await axios.get("/api/destinos/listid/" + id);
        setNombreDestino(data.destino.nombreDestino);
        setUbicacionDestino(data.destino.ubicacionDestino);
        setDescripcionDestino(data.destino.descripcionDestino);
        setPreview(data.destino.img);
      } catch (error) {
        if (!error.response.data.ok) {
          return alert(error.response.data.mensaje);
        }
        console.log('error en la funcion searchPostById', error.message);
      }
    };
    id ? searchPostById() :
      setNombreDestino("");
    setUbicacionDestino("");
    setDescripcionDestino("");
    setPreview("");
    getData(page);
    fetchDestinos();
  }, [page, id]);

  const actions = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    image !== "" && formData.append("img", image);
    formData.append("nombreDestino", nombreDestino);
    formData.append("ubicacionDestino", ubicacionDestino);
    formData.append("descripcionDestino", descripcionDestino);

    // Aquí necesitas obtener el ID del localStorage u otra fuente
    const id = localStorage.getItem('id'); // Asegúrate de tener un ID válido

    edit ? updateDestino(id, formData) : saveDestino(formData);

  };

  const cleanData = () => {
    setDestinos('')
    setNombreDestino('')
    setUbicacionDestino('')
    setDescripcionDestino('')
    setImage('')
    setPreview('')

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



  const saveDestino = async (datos) => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/destinos/add', datos, options);
      setLoading(false);
      data.ok &&
        Swal.fire({
          icon: 'success',
          text: 'El destino se guardo correctamente',
          showConfirmButton: false,
          timer: 1500,
        });
      cleanData();
      getData();
      closeModal();
    } catch (error) {
      if (!error.response.data.ok) {
        return alert(error.response.data.mensaje);
      }
      console.log('error en la funcion saveDestino', error.message);
    }
  };

  const editData = (item) => {
    console.log('ID:', item._id); // Agregar esta línea para imprimir el ID
    setEdit(true);
    setNombreDestino(item.nombreDestino || '');
    setUbicacionDestino(item.ubicacionDestino || '');
    setDescripcionDestino(item.descripcionDestino || '');
    setImage(item.image || '');
    setPreview(item.img || '');

    localStorage.setItem('id', item._id);
    setIsModalOpen(true);
  };

  const updateDestino = async (id, datos) => {
    try {
      setLoading(true)
      console.log('ID antes de la solicitud PUT:', id); // Agregar esta línea para imprimir el ID antes de la solicitud PUT
      // le faltaba el / despues de la palabra update
      const { data } = await axios.put(`/api/destinos/update/${id}`, datos, options);
      setLoading(false)
      Swal.fire({
        icon: 'success',
        text: data.mensaje,
        showConfirmButton: false,
        timer: 1500,
      });
      cleanData();
      getData();
      closeModal();

    } catch (error) {
      if (!error.response.data.ok) {
        return alert(error.response.data.mensaje);
      }
      console.log('error en la funcion updateDestino', error.message);
    }
  }

  const closeModal = () => {
    setIsModalOpen(false);

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

  const validarFormato = (e) => {
    if (e.target.files && e.target.files[0]) {
      const imagen = e.target.files[0]
      if (!/\.(jpeg|jpg|png|svg|JPG|PNG|SVG)$/.test(imagen.name)) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "El archivo a adjuntar no es un formato valido"
        });
        e.target.value = "";
      } else {
        setImage(imagen);
        setPreview(URL.createObjectURL(imagen));
      }
    }
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
                      {/* prev img */}
                      {preview !== "" && (
                        <img src={preview} className="card-img-top" alt="prev" />
                      )}
                      <label htmlFor="validationCustom01" className="form-label"> Nombre del Destino</label>
                      <input type="text" className="form-control" id="nombreDestino"
                        value={nombreDestino}
                        onChange={(e) => setNombreDestino(e.target.value.toUpperCase())}
                        maxLength={30}
                        required />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="ubicacionDestino" className="form-label">Ubicación</label>
                      <input type="text" className="form-control" id="ubicacionDestino"
                        value={ubicacionDestino}
                        onChange={(e) => setUbicacionDestino(e.target.value.toUpperCase())}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="exampleFormControlTextarea1" className="form-label">Descripcion del destino</label>
                      <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                        value={descripcionDestino}
                        onChange={(e) => setDescripcionDestino(e.target.value)}
                        required></textarea>
                    </div>
                    <div className="mb-3">
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => validarFormato(e)}
                      ></input>
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
                  {loading && (
                    <div className="progress">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: `${uploadState}%` }}
                      ></div>
                    </div>
                  )}
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
                  <th scope="col" className="responsive-text">Imagen</th>

                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(filteredDestinos) && filteredDestinos.map((item, i) => (
                  <tr key={item._id} >
                    <td >{i + 1}</td>
                    <td className='responsive-text'>{item.nombreDestino}</td>
                    <td className='responsive-text'>{item.ubicacionDestino}</td>
                    <td className='responsive-text'>{item.descripcionDestino}</td>
                    <td className='responsive-text' style={{ width: 'fit-content' }}>
                      <img src={item.img} className="img-rounded w-50 p-1" alt="imagen"></img>
                    </td>

                    {/*<td>{DateTime.fromISO(item.fechanacimientoCliente).toFormat('dd/LL/yyyy')}</td>*/}



                    <td>
                      <div className="btn-group btn-group-sm" role="group">
                        <span className='btn btn-primary d-flex align-items-center me-2' onClick={() => editData(item)}
                          title="Editar">
                          <i className="fa-solid fa-pencil space-i"></i>
                        </span>
                        <span className='btn btn-danger d-flex align-items-center'
                          onClick={() => deleteDestino(item._id)}
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
          {Array.isArray(destinos) && destinos.map((item, i) => (
            <div key={item._id} className='card border-3'>
              {/* Contenido de la tarjeta */}
              <div className='card-body'>
                <h5 className='card-title'>Destino {i + 1}</h5>
                <img src={item.img} className='card-img-top' alt="imagen del destino"></img>
                <p className='card-text'>
                  <strong>Nombre del destino:</strong> {item.nombreDestino}<br />
                  <strong>Ubicacion:</strong> {item.ubicacionDestino}<br />
                  <strong>descripcion del Destino:</strong> {item.descripcionDestino}<br />

                </p>
                <div className='btn-group btn-group-xl'>
                  <span className='btn btn-primary d-flex align-items-center me-2'
                    onClick={() => updateDestino(destinos._id)}
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