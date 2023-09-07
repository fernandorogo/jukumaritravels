import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';

const Reservas = () => {
  const [reservas, setReservas] = useState([])
  const [fechaReserva, setFechaReserva] = useState('')
  const [fechaSalida, setFechaSalida] = useState('')
  const [fechaLlegada, setFechaLlegada] = useState('')

  const [edit, setEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);



  useEffect(() => {
    getData();
  }, []);

  const cleanData = () => {
    setReservas('')
    setFechaReserva('')
    setFechaSalida('')
    setFechaLlegada('')
    setEdit(false);

  
    
  }

  const getData = async () => {
    const { data } = await axios.get("http://localhost:4000/api/reservas/");
    setReservas(data.reservas);
  };

  const saveReserva = async () => {
    try {
      const newReserva = {
        fechaReserva,
        fechaSalida,
        fechaLlegada,
       

      }
      await axios.post('http://localhost:4000/api/reservas/', newReserva);
      cleanData()
      getData();

      // SweetAlert2 para mostrar éxito
      Swal.fire({
        icon: 'success',
        title: 'La reserva se ha guardado exitosamente',
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
    edit? updateReserva() : saveReserva();

    
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };




  
  const updateReserva = async () => {
    try {
      const id = localStorage.getItem('id');
      const newReserva = {
        fechaReserva,
        fechaSalida,
        fechaLlegada
      }

      const { data } = await axios.put('/api/reservas' + id, newReserva);
      setFechaReserva(newReserva.fechaReserva);
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
    setFechaReserva(item.fechaReserva)
    setFechaSalida(item.fechaSalida)
    setFechaLlegada(item.fechaLlegada)

    localStorage.setItem('id', item._id);
    setIsModalOpen(true);
  }

  const formattedDate = DateTime.fromISO(fechaReserva).toFormat('yyyy-MM-dd');

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



  return (
    <div>

      <div className='container-md mt-5'>
      <div className={`modal fade ${isModalOpen ? 'show' : ''}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!isModalOpen} style={{ display: isModalOpen ? 'block' : 'none' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header" style={{ backgroundColor: "#008cba" }}>
                  <h5 className="modal-title text-white" id="exampleModalLabel">Ingreso de Reservas</h5>
                  <button type="button" className="btn-close bg-white" onClick={() => {
                    cleanData();
                    getData();
                    closeModal();
                  }}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={actions}>
                    <div className="col-md-12 mb-3">
                      <label htmlFor="validationCustom01" className="form-label">Fecha Reserva</label>
                      <input type="date" className="form-control" id="fechaReserva"
                        value={formattedDate} onChange={(e) => setFechaReserva(e.target.value.toUpperCase())} required />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label htmlFor="fechaSalida" className="form-label">Fecha Salida</label>
                      <input type="date" className="form-control" id="fechaSalida" value={fechaSalida} onChange={(e) => setFechaSalida(e.target.value.toUpperCase())} required />

                    </div>
                    <div className="col-md-12 mb-3">
                      <label htmlFor="fechaLlegada" className="form-label">Fecha Regreso</label>
                      <input type="date" className="form-control" id="fechaLlegada" value={fechaLlegada} onChange={(e) => setFechaLlegada(e.target.value.toUpperCase())} required />

                    </div>
                    {/* Campo para ingresar el documento del cliente 
                    <div className="mb-3">
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
                    <button type="button" className="btn btn-primary" onClick={consultarCliente}>Consultar Cliente</button>

                     */}




                    <div className="modal-footer">
                      <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                      <button type="submit" className="btn btn-primary"  >Guardar Registro</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

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
            <h6 className='text-primary fw-bold m-0 mt-1 text-start'> Lista de Reservas</h6>
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
                    className='responsive-text'>Fecha Reserva</th>
                  <th scope='col'
                    className='responsive-text'>Fecha Salida</th>
                  <th scope='col'
                    className='responsive-text'> Fecha Llegada</th>
                  <th scope='col'> Acciones </th>
                </tr>

              </thead>
              <tbody>
                {Array.isArray(reservas) && reservas.map((item, i) => (
                  <tr key={item._id}>
                  <td> {i + 1}</td>
                  {<td className='responsive-text'>{DateTime.fromISO(item.fechaReserva).toFormat('dd/LL/yyyy')}</td>}
                  {<td className='responsive-text'>{DateTime.fromISO(item.fechaSalida).toFormat('dd/LL/yyyy')}</td>}
                  {<td className='responsive-text'> {DateTime.fromISO(item.fechaLlegada).toFormat('dd/LL/yyyy')}</td>}
                 
                  <td>
                      <div className="btn-group btn-group-sm" role="group">
                        <span className='btn btn-primary d-flex align-items-center me-2' onClick={() => editData(item)}

                        
                        >
                          <i className="fa-solid fa-pencil space-i" ></i>
                        </span>
                        <span className='btn btn-danger d-flex align-items-center'
                          onClick={() => deleteReserva(item._id) } 
                        >
                          <i className="fa-solid fa-trash"></i>
                        </span>
                      </div>
                    </td>
                </tr>))}
              
              </tbody>
            </table>
          </div>
        </div>


        {/*Mostar cards solo en dispositivos moviles */}
        <div className='d-md-none'>
          {Array.isArray(reservas) && reservas.map((item, i) => (
            <div key={item._id} className='card border-3'>
              <div className='card-body'>
                <h5 className='card-title'> Reserva {i + 1} </h5>
                <p className='card-text'>
                  <strong> Fecha Reserva: </strong> {item.fechaReserva} <br />
                  <strong> Fecha Salida: </strong> {item.fechaSalida} <br />
                  <strong> Fecha Llegada</strong> {item.fechaLlegada}
                </p>
                <div className='btn-group btn-group-xl'>
                  <span className='btn btn-primary d-flex align-items-center me-2'
                    
                  >
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
      </div>

      
      </div>
    </div >
  )
}



export default Reservas