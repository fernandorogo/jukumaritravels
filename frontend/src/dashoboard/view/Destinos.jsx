import axios from 'axios';
import Pagination from 'rc-pagination';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import "./TextResponsive.css";

const Destinos = () => {
  const [destinos, setDestinos] = useState([])
  const [nombreDestino, setnombreDestino] = useState('')
  const [ubicacion, setubicacion] = useState('')
  const [descripcionDestino, setdescripcionDestino] = useState('')
   // Paginacion
   const [page, setPage] = useState(1);
   const [totalPages, setTotalPages] = useState('')

  useEffect(() => {
    getData(page);
  }, [page]);

  const cleanData = () => {
    setDestinos('')
    setnombreDestino('')
    setubicacion('')
    setdescripcionDestino('')
  }

  const getData = async (pageCurrent) => {
    const { data } = await axios.get(`/api/destinos/list/?page=${pageCurrent}`);
    setDestinos(data.destinos.docs);
    setPage(data.destinos.page);
    setTotalPages(data.destinos.totalPages);
  };

  const onchangePage = (page) => {
    getData(page);
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

      // SweetAlert2 para mostrar éxito
      Swal.fire({
        icon: 'success',
        title: 'Destino guardado exitosamente',
        showConfirmButton: false,
        timer: 1500
      });

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
  const actions = (e) => {
    e.preventDefault();
    saveDestino();
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

  return (
    <div>
      <div className='container-md mt-5'>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg" >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header" style={{ backgroundColor: "#008cba" }}>
                  <h5 className="modal-title text-white" id="exampleModalLabel">Ingreso de Destinos</h5>
                  <button type="button" className="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={actions}>
                    <div className="col-md-12">
                      <label htmlFor="validationCustom01" className="form-label"> Nombre Destino</label>
                      <input type="text" className="form-control" id="nombreDestino"
                        value={nombreDestino} onChange={(e) => setnombreDestino(e.target.value.toUpperCase())}
                        required />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="validationCustom01" className="form-label"> Ubicacion</label>
                      <input type="text" className="form-control" id="ubicacion"
                        value={ubicacion} onChange={(e) => setubicacion(e.target.value.toUpperCase())} />

                    </div>
                    <div className="col-md-12">
                      <label htmlFor="exampleFormControlTextarea1" className="form-label">Descripcion del destino</label>
                      <textarea className="form-control" id="descripcionDestino"
                        value={descripcionDestino} onChange={(e) => setdescripcionDestino(e.target.value.toUpperCase())}></textarea>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>

                      <button type="submit" className="btn text-white" style={{ backgroundColor: "#008cba" }}>Guardar Registro</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
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
                <tr style={{ backgroundColor: "#008cba", color: "#ffffff" }}>
                  <th scope="col" className="responsive-text">#</th>
                  <th scope="col" className="responsive-text">Nombre Destino</th>
                  <th scope="col" className="responsive-text">Ubicación</th>
                  <th scope="col" className="responsive-text">Descripcion del destino</th>
                  <th scope="col" className="responsive-text">Acciones</th>
                </tr>
              </thead >
              <tbody>
                {Array.isArray(destinos) && destinos.map((item, i) => (
                  <tr key={item._id}>
                    <td className="responsive-text">{i + 1}</td>
                    <td className="responsive-text">{item.nombreDestino}</td>
                    <td className="responsive-text">{item.ubicacion}</td>
                    <td className="responsive-text">{item.descripcionDestino}</td>
                    <td>
                      <div className="btn-group btn-group-sm" role="group">
                        <span className='btn btn-primary d-flex align-items-center me-2' >
                          <i className=" fa-solid fa-pencil space-i "></i>
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
                <h5 className='card-title'>Destinos {i + 1}</h5>
                <p className='card-text'>
                  <strong>Nombre destino:</strong> {item.nombreDestino}<br />
                  <strong>Ubicación:</strong> {item.ubicacion}<br />
                  <strong>Descripcion del destino:</strong> {item.ubicacion}<br />
                </p>
                <div className='btn-group btn-group-xl'>
                  <span className='btn btn-primary d-flex align-items-center me-2'>
                    <i className="fa-solid fa-pencil space-i"></i>
                  </span>
                  <span className='btn btn-danger me-2  '
                    onClick={() => deleteDestino(item._id)}
                  ><i className="fa-solid fa-trash"></i></span>
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
    </div>
  )
}

export default Destinos