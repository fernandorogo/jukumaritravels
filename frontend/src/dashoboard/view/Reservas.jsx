import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const Reservas = () => {
  const [reservas, setReservas] = useState([])
  const [fechaReserva, setFechaReserva] = useState('')
  const [fechaSalida, setFechaSalida] = useState('')
  const [fechaLlegada, setFechaLlegada] = useState('')
  const [documentoCliente, setDocumentoCliente] = useState(''); // Estado para almacenar el documento del cliente
  const [clienteInfo, setClienteInfo] = useState(null); // Estado para almacenar la información del cliente



  useEffect(() => {
    getData();
  }, []);

  const cleanData = () => {
    setReservas('')
    setFechaReserva('')
    setFechaSalida('')
    setFechaLlegada('')
    setClienteInfo(null);
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
        clientes: clienteInfo ? clienteInfo._id : null, // Usar el ID del cliente si hay información

      }
      await axios.post('http://localhost:4000/api/reservas/', newReserva);
      cleanData()
      getData();

    } catch (error) {
      if (!error.response.data.ok) {
        return alert(error.response.data.message)
      }
      console.log('error en saveReserva', error.message);

    }
  }
  const actions = async (e) => {
    e.preventDefault();
    saveReserva();
  
    // Realizar la consulta del cliente por documento
    try {
      const response = await axios.get(`http://localhost:4000/api/clientes/${documentoCliente}`);
      const data = response.data;
  
      if (data.ok) {
        setClienteInfo(data.message); // Almacenar la información del cliente
        saveReserva(); // Llamar a saveReserva después de obtener la información del cliente
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error al consultar cliente:', error.message);
    }
  };
  
  
  
  
  
  //codigo nuevo para consultar cliente
  const consultarCliente = async (documentoCliente) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/clientes/${documentoCliente}`);
      const data = response.data;

      if (data.ok) {
        setClienteInfo(data.message);
        saveReserva();
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error al consultar cliente:', error.message);
    }
  };
  


  const completeDataFields = (item) => {
    setFechaReserva(item.fechaReserva)
    setFechaSalida(item.fechaSalida)
    setFechaLlegada(item.fechaLlegada)
    localStorage.setItem('id', item._id)

  }



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


        <button type="button" className="btn btn-primary" style={{ backgroundColor: "#008cba" }} data-bs-toggle="modal" data-bs-target="#exampleModal">
          < i className="fa-solid fa-plus fa-beat fa-lg me-2" style={{ color: "#ffffff" }}></i> RESERVA
        </button>

        {/*Inicio de formulario*/}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header" style={{ backgroundColor: "#008cba" }}>
                  <h5 className="modal-title text-white" id="exampleModalLabel">Ingreso de Reservas</h5>
                  <button type="button" className="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={actions}>
                    <div className="col-md-12 mb-3">
                      <label htmlFor="validationCustom01" className="form-label">Fecha Reserva</label>
                      <input type="date" className="form-control" id="fechaReserva"
                        value={fechaReserva} onChange={(e) => setFechaReserva(e.target.value.toUpperCase())} required />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label htmlFor="fechaSalida" className="form-label">Fecha Salida</label>
                      <input type="date" className="form-control" id="fechaSalida" value={fechaSalida} onChange={(e) => setFechaSalida(e.target.value.toUpperCase())} required />

                    </div>
                    <div className="col-md-12 mb-3">
                      <label htmlFor="fechaLlegada" className="form-label">Fecha Regreso</label>
                      <input type="date" className="form-control" id="fechaLlegada" value={fechaLlegada} onChange={(e) => setFechaLlegada(e.target.value.toUpperCase())} required />

                    </div>
                    {/* Campo para ingresar el documento del cliente */}
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

                    {/* ... Resto del formulario ... */}




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

        <br></br>
        <br></br>

        <div className='container-md'>
          <table className="table table-bordered border-dark table-hover">
            <thead>
              <tr style={{ background: "#008cba", color: "#ffffff" }}>
                <th scope="col">#</th>
                <th scope="col">Fecha Reserva</th>
                <th scope="col">Fecha Salida</th>
                <th scope="col">Fecha de Regreso</th>
                <th scope='col'> Cliente</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(reservas) && reservas.map((item, i) => (
                <tr key={item._id}>
                  <td> {i + 1}</td>
                  <td> {item.fechaReserva} </td>
                  <td> {item.fechaSalida} </td>
                  <td> {item.fechaLlegada} </td>
                  <td> {item.cliente}</td>

                  <td>
                    <div className='d-flex justify-content-center'>

                      <span className='btn btn-primary me-2  ' onClick={() => completeDataFields(item._id)}>
                        <i className=" fa-solid fa-pencil space-i "></i>
                      </span>


                      <span className='btn btn-danger me-2  '
                        onClick={() => deleteReserva(item._id)}
                      ><i className="fa-solid fa-trash"></i></span>
                    </div>


                  </td>
                </tr>))}

            </tbody>
          </table>
        </div>
      </div>
    </div >
  )
              }
            
              

export default Reservas