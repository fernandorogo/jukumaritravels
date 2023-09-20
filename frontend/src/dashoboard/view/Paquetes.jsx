import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Pagination from 'rc-pagination'



const Paquetes = () => {
  const [paquetesturisticos, setPaquetesturisticos] = useState([])
  const [paqueteTuristico, setpaqueteTuristico] = useState('')
  const [reseñaPaqueteturistico, setreseñaPaqueteturistico] = useState('')
  const [valordelPaquete, setvalordelPaquete] = useState('')


  const [edit, setEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPaquetes, setfilteredPaquetes] = useState([]);

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState('')



  useEffect(() => {
    getData(page);
    fetchPaquetesTuristicos();
  }, [page]);

  const cleanData = () => {
    setPaquetesturisticos('')
    setpaqueteTuristico('')
    setreseñaPaqueteturistico('')
    setvalordelPaquete('')

    setEdit(false);


  }
  const getData = async (pageCurrent) => {
    const { data } = await axios.get(`/api/paquetes/list/?page=${pageCurrent}`);
    setPaquetesturisticos(data.paquetesturisticos.docs);
    setfilteredPaquetes(data.paquetestusirticos.docs);
    setPage(data.paquetesturisticos.page);
    setTotalPages(data.paquetesturisticos.totalPages)
  };

  const onchangePage = (page) => {
    getData(page)
  }


  const savePaquete = async () => {
    try {
      const newPaquete = {
        paqueteTuristico,
        reseñaPaqueteturistico,
        valordelPaquete,

      }
      await axios.post('/api/paquetes/', newPaquete);
      cleanData();
      getData();
      closeModal();

      // SweetAlert2 para mostrar éxito
      Swal.fire({
        icon: 'success',
        title: 'Paquete guardado exitosamente',
        showConfirmButton: false,
        timer: 1500
      });

    } catch (error) {
      if (!error.response.data.ok) {
        return alert(error.response.data.message)
      }
      console.log('error en savePaquete', error.message);


    }
  }
  const updatePaquete = async () => {
    try {
      const id = localStorage.getItem('id');
      const newPaquete = {
        paqueteTuristico,
        reseñaPaqueteturistico,
        valordelPaquete,

      }
      const { data } = await axios.put('/api/paquetes/' + id, newPaquete);

      cleanData();
      getData();
      closeModal();

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
      console.log('error en savePaquete', error.message);

    }
  }

  const editData = (item) => {
    setEdit(true);
    setpaqueteTuristico(item.paqueteTuristico)
    setreseñaPaqueteturistico(item.reseñaPaqueteturistico)
    setvalordelPaquete(item.valordelPaquete)

    localStorage.setItem('id', item._id);
    setIsModalOpen(true);

  }
  const closeModal = () => {
    setIsModalOpen(false);
  };


  const actions = (e) => {
    e.preventDefault();
    edit ? updatePaquete() : savePaquete();
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
          const { data } = await axios.delete('http://localhost:4000/api/paquetes/' + id);
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

  
  const fetchPaquetesTuristicos = async () => {
    fetch('api/paquetes')
      .then(response => response.text())
      .catch(error => console.error('Error feching paquetesturisticos:', error));
  };

  const searchFields = [
    'paqueteTuristico'
  ];

  const handleSearch = (e) => {
    const searchText = e.target.value;
    setSearchTerm(searchText);

    const filtered = paquetesturisticos.filter((paqueteturistico) => searchFields.some((field) => String(paqueteturistico[field]).toLowerCase().includes(searchText.toLowerCase())
    )
    );
    setfilteredPaquetes(filtered)
  }


  return (
    <div>

      <div className='container-md mt-5'>


        <div className={`modal fade ${isModalOpen ? 'show' : ''}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!isModalOpen} style={{ display: isModalOpen ? 'block' : 'none' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header" style={{ backgroundColor: "#008cba" }}>
                  <h5 className="modal-title text-white" id="exampleModalLabel">Ingreso de Paquetes</h5>
                  <button type="button" className="btn-close bg-white" onClick={() => {
                    cleanData();
                    getData();
                    closeModal();
                  }} />
                </div>
                <div className="modal-body ">
                  <form id=" paquetesForm" onSubmit={actions}>
                    <div className="col-md-12">
                      <label htmlFor="validationCustom01" className="form-label"> Nombre del Paquete</label>
                      <input type="text" className="form-control" id="paqueteTuristico"
                        value={paqueteTuristico} onChange={(e) => setpaqueteTuristico(e.target.value.toUpperCase())}
                        required />
                    </div>
                    <div className="col-md-12">
                      <label for="exampleFormControlTextarea1" className="form-label">Reseña de paquete</label>
                      <textarea className="form-control" id="reseñaPaqueteturistico"
                        value={reseñaPaqueteturistico} onChange={(e) => setreseñaPaqueteturistico(e.target.value.toUpperCase())}></textarea>
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="validationCustom01" className="form-label"> Valor</label>
                      <input type="Number" className="form-control" id="valordelPaquete"
                        value={valordelPaquete} onChange={(e) => setvalordelPaquete(e.target.value.toUpperCase())} />

                    </div>
                    <div className="modal-footer border-5">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                          getData();
                          cleanData();
                          closeModal();

                          document.getElementById('paquetesForm').click();
                        }}
                        data-bs-dismiss="modal"

                      >Cerrar
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


      {/* Incio de la tabla Paquetes*/}
      <div className='container container-flex card larger shadow mt-3'>
        <div className='card-header d-flex justify-content-between align-items-center'>
          <div className="dropdown no-arrow align-items-center">
            <button className="btn btn-link btn-sm dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown" type="button">
              <i className='fas fa-ellipsis-v 
            text-gray-400'></i>
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
            <h6 className='text-primary fw-bold m-0 mt-1 text-start'> Lista de Paquetes</h6>
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
            <button type='button' className='btn btn-primary rounded-circle aling-end' style={{
              backgroundColor: '#008cba'
            }} onClick={() => { setIsModalOpen(true); }} title='Haga click para agregar un nuevo paquete'> <i className='fa-solid fa-plus fa-beat'></i></button>

          </div>
        </div>
        <div className='d-none d-md-block'>
          <div className='table-responsive'>
            <table className='table table-bordered border-1 table-hover mt-2'>
              <thead>
                <tr style={{ background: '#008cba', color: '#ffffff' }}>
                  <th scope='col'
                    className='responsive-text'> # </th>
                  <th scope='col'
                    className='responsive-text'>Nombre del Paquete</th>
                  <th scope='col'
                    className='responsive-text'>Reseña del paquete</th>
                  <th scope='col'
                    className='responsive-text'> Valor del paquete</th>
                  <th scope='col'> Acciones </th>
                </tr>

              </thead>
              <tbody>
                {Array.isArray(filteredPaquetes) && filteredPaquetes.map((item, i) => (
                  <tr key={item._id}>
                    <td className='responsive-text'>{i + 1}</td>
                    <td className='responsive-text'>{item.paqueteTuristico}</td>
                    <td className='responsive-text'>{item.reseñaPaqueteturistico}</td>
                    <td className='responsive-text'>{item.valordelPaquete}</td>
                    <td>
                      <div className='btn-group btn-group-sm ' role='group'>
                        <span className='btn btn-primary d-flex align-items-center me-2' onClick={() => editData(item)}
                          title='Editar'>
                          <i className='fa-solid fa-pencil space-i'></i>
                        </span>
                        <span className='btn btn-danger d-flex align-itesm-center' onClick={() => deletePaquete(item._id)}
                          title='Eliminar'>
                          <i className='fa-solid fa-trash'></i>
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


        {/*Mostar cards solo en dispositivos moviles */}
        <div className='d-md-none'>
          {Array.isArray(paquetesturisticos) && paquetesturisticos.map((item, i) => (
            <div key={item._id} className='card border-3'>
              <div className='card-body'>
                <h5 className='card-title'> Paquete Turistico {i + 1} </h5>
                <p className='card-text'>
                  <strong> Nombre del Paquete: </strong> {item.paqueteTuristico} <br />
                  <strong> Reseña del Paquete: </strong> {item.reseñaPaqueteturistico} <br />
                  <strong> Valor del Paquete</strong> {item.valordelPaquete}
                </p>
                <div className='btn-group btn-group-xl'>
                  <span className='btn btn-primary d-flex align-items-center me-2'
                    onClick={() => editData(item)}
                  >
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
            onChange={onchangePage}
          />
        </div>




      </div>
    </div>
  )
}

export default Paquetes