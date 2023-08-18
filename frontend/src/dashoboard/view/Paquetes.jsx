import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';


const Paquetes = () => {
  const [paquetesturisticos, setPaquetesturisticos] = useState([])
  const [paqueteTuristico, setpaqueteTuristico] = useState('')
  const [reseñaPaqueteturistico, setreseñaPaqueteturistico] = useState('')
  const [valordelPaquete, setvalordelPaquete] = useState('')

  useEffect(() => {
    getData();
  }, []);

  const cleanData = () => {
    setPaquetesturisticos('')
    setpaqueteTuristico('')
    setreseñaPaqueteturistico('')
    setvalordelPaquete('')
  }
  const getData = async () => {
    const { data } = await axios.get("http://localhost:4000/api/paquetes/");
    setPaquetesturisticos(data.paquetesturisticos);
  };
  const savePaquete = async () => {
    try {
      const newPaquete = {
        paqueteTuristico,
        reseñaPaqueteturistico,
        valordelPaquete,

      }
      await axios.post('http://localhost:4000/api/paquetes/', newPaquete);
      cleanData();
      getData();

    } catch (error) {
      if (!error.response.data.ok) {
        return alert(error.response.data.message)
      }
      console.log('error en savePaquete', error.message);


    }
  }
  const actions = (e) => {
    e.preventDefault();
    savePaquete();
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


  return (
    <div>
      
      <div className='container-md mt-5'>

        <button type="button" className="btn btn-primary" style={{ backgroundColor: "#008cba" }} data-bs-toggle="modal" data-bs-target="#exampleModal">
          < i className="fa-solid fa-plus fa-beat fa-lg me-2" style={{ color: "#ffffff" }}></i> PAQUETE
        </button>


        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header" style={{ backgroundColor: "#008cba" }}>
                  <h5 className="modal-title text-white" id="exampleModalLabel">Ingreso de Paquetes</h5>
                  <button type="button" className="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body ">
                  <form onSubmit={actions}>
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
          <thead className= ''>
            <tr style={{ backgroundColor: "#008cba", color: "#ffffff"}}>
              <th scope="col">#</th>
              <th scope="col">Nombre Paquete</th>
              <th scope="col">Reseña del Paquete</th>
              <th scope="col">Valor</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead >
          <tbody>
            {Array.isArray(paquetesturisticos) && paquetesturisticos.map((item, i) => (
              <tr key={item._id}>
                <td>{i + 1}</td>
                <td>{item.paqueteTuristico}</td>
                <td>{item.reseñaPaqueteturistico}</td>
                <td>{item.valordelPaquete}</td>


                <td>
                  <div className='d-flex justify-content-between'>
                    <span className='btn btn-primary me-2  '>
                      <i className=" fa-solid fa-pencil space-i "></i>
                    </span>


                    <span className='btn btn-danger me-2  '
                      onClick={() => deletePaquete(item._id)}
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

export default Paquetes