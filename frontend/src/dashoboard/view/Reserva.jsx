import React from 'react'

const Reserva = () => {
  return (
    <div>

      <div className='container-md mt-5'>


        <button type="button" className="btn btn-primary" style={{ backgroundColor: "#008cba" }} data-bs-toggle="modal" data-bs-target="#exampleModal">
          < i className="fa-solid fa-plus fa-beat fa-lg me-2" style={{ color: "#ffffff" }}></i> RESERVA
        </button>


        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header" style={{ backgroundColor: "#008cba" }}>
                <h5 className="modal-title text-white" id="exampleModalLabel">Ingreso de Reservas</h5>
                <button type="button" className="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form className="row g-3 needs-validation" noValidate>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="validationCustom02" className="form-label">Codigo Reserva</label>
                    <input type="number" className="form-control" id="validationCustom02" required />
                    <div className="valid-feedback"></div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="validationCustom01" className="form-label">Fecha Reserva</label>
                    <input type="date" className="form-control" id="validationCustom01" required />
                    <div className="valid-feedback"></div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="validationCustom02" className="form-label">Codigo Cliente</label>
                    <input type="number" className="form-control" id="validationCustom02" required />
                    <div className="valid-feedback"></div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="validationCustom01" className="form-label">Fecha Salida</label>
                    <input type="date" className="form-control" id="validationCustom01" required />
                    <div className="valid-feedback"></div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="validationCustom01" className="form-label">Fecha Regreso</label>
                    <input type="date" className="form-control" id="validationCustom01" required />
                    <div className="valid-feedback"></div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="validationCustom01" className="form-label">ID paquete turistico</label>
                    <input type="number" className="form-control" id="validationCustom01" required />
                    <div className="valid-feedback"></div>
                  </div>
                  <div className="col-12 mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Pasajeros</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" className="btn btn-primary">Guardar Registro</button>
              </div>
            </div>
          </div>
        </div>

        <br></br>
        <br></br>

        <div className='container-md'>
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Primero</th>
                <th scope="col">Último</th>
                <th scope="col">Handle</th>
                <th scope="col">Estado</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td><button type="button" className="btn btn-success" style={{ width: '135px', height: '35px' }}>Activo</button></td>
                <td>
                  <span style={{ border: "1px solid silver", borderRadius: "0.25em", padding: "0.5em" }} className='me-2 btn-primary'> <i className="fa-solid fa-pencil space-i "></i></span>
                  <span style={{ border: "1px solid silver", borderRadius: "0.25em", padding: "0.5em" }} className='me-2 btn-danger'><i className="fa-solid fa-trash"></i></span>
                </td>
              </tr>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td><button type="button" className="btn btn-success" style={{ width: '135px', height: '35px' }}>Activo</button></td>
                <td>
                  <span style={{ border: "1px solid silver", borderRadius: "0.25em", padding: "0.5em" }} className='me-2 btn-primary'> <i className="fa-solid fa-pencil space-i "></i></span>
                  <span style={{ border: "1px solid silver", borderRadius: "0.25em", padding: "0.5em" }} className='me-2 btn-danger'><i className="fa-solid fa-trash"></i></span>
                </td>
              </tr>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td><button type="button" className="btn btn-success" style={{ width: '135px', height: '35px' }}>Activo</button></td>
                <td>
                  <span style={{ border: "1px solid silver", borderRadius: "0.25em", padding: "0.5em" }} className='me-2 btn-primary'> <i className="fa-solid fa-pencil space-i "></i></span>
                  <span style={{ border: "1px solid silver", borderRadius: "0.25em", padding: "0.5em" }} className='me-2 btn-danger'><i className="fa-solid fa-trash"></i></span>
                </td>
              </tr>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td><button type="button" className="btn btn-danger" style={{ width: '135px', height: '35px' }}>Cancelado</button></td>
                <td>
                  <span style={{ border: "1px solid silver", borderRadius: "0.25em", padding: "0.5em" }} className='me-2 btn-primary'> <i className="fa-solid fa-pencil space-i "></i></span>
                  <span style={{ border: "1px solid silver", borderRadius: "0.25em", padding: "0.5em" }} className='me-2 btn-danger'><i className="fa-solid fa-trash"></i></span>
                </td>
              </tr>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td><button type="button" className="btn btn-success" style={{ width: '135px', height: '35px' }}>Activo</button></td>
                <td>
                  <span style={{ border: "1px solid silver", borderRadius: "0.25em", padding: "0.5em" }} className='me-2 btn-primary'> <i className="fa-solid fa-pencil space-i "></i></span>
                  <span style={{ border: "1px solid silver", borderRadius: "0.25em", padding: "0.5em" }} className='me-2 btn-danger'><i className="fa-solid fa-trash"></i></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Reserva