import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const Destinos = () => {
  const [destinos, setDestinos] = useState([])
  const [nombreDestino, setnombreDestino] = useState('')
  const [ubicacion, setubicacion] = useState('')
  const [descripcionDestino, setdescripcionDestino] = useState('')

  useEffect(() => {
    getData();
  }, []);

  const cleanData = () => {
    setDestinos('')
    setnombreDestino('')
    setubicacion('')
    setdescripcionDestino('')
  }

  const getData = async () => {
    const { data } = await axios.get("http://localhost:4000/api/destinos/");
    setDestinos(data.destinos);

  };

  const saveDestino = async () => {
    try {
      const newDestino = {
        nombreDestino,
        ubicacion,
        descripcionDestino
      }
      await axios.post('http://localhost:4000/api/destinos/', newDestino);
      cleanData();
      getData();

    } catch (error) {
      if (!error.response.data.ok) {
        return alert(error.response.data.message)
      }
      console.log('error en saveDestino', error.message);


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
          const { data } = await axios.delete('http://localhost:4000/api/destinos/' + id);
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

        <button type="button" className="btn btn-primary" style={{ backgroundColor: "#008cba" }} data-bs-toggle="modal" data-bs-target="#exampleModal">
          < i className="fa-solid fa-plus fa-beat fa-lg me-2" style={{ color: "#ffffff" }}></i>DESTINO
        </button>
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
                      <label for="exampleFormControlTextarea1" className="form-label">Descripcion del destino</label>
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
      <br></br>
      <br></br>
      
      <div className='container-md table-responsive'>
        <table className="table table-bordered border-dark table-hover ">
          <thead>
            <tr style={{ backgroundColor: "#008cba", color: "#ffffff"}}>
              <th scope="col">#</th>
              <th scope="col">Nombre Destino</th>
              <th scope="col">Ubicación</th>
              <th scope="col">Descripcion del destino</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead >
          <tbody>
            {Array.isArray(destinos) && destinos.map((item, i) => (
              <tr key={item._id}>
                <td>{i + 1}</td>
                <td>{item.nombreDestino}</td>
                <td>{item.ubicacion}</td>
                <td>{item.descripcionDestino}</td>


                <td>
                  <div className='d-flex justify-content-between'>
                    <span className='btn btn-primary me-2  '>
                      <i className=" fa-solid fa-pencil space-i "></i>
                    </span>


                    <span className='btn btn-danger me-2  '
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
  )
}

export default Destinos