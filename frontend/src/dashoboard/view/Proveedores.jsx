import React from 'react'


const Proveedores = () => {
  return (
    <div>
      <div className='container-md mt-5'>

        <button type="button" className="btn btn-primary" style={{ backgroundColor: "#008cba" }} data-bs-toggle="modal" data-bs-target="#exampleModal">
          < i className="fa-solid fa-plus fa-beat fa-lg me-2" style={{ color: "#ffffff" }}></i> PROVEEDOR
        </button>


        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-xl" >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header" style={{ backgroundColor: "#008cba" }}>
                  <h5 className="modal-title text-white" id="exampleModalLabel">Ingreso de Proveedores</h5>
                  <button type="button" className="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">

                  <form className="row g-3 needs-validation" noValidate>


                    <div className="col-md-3">
                      <label htmlFor="validationCustom02" className="form-label">Codigo Proveedores</label>
                      <input type="number" className="form-control" id="validationCustom02" required />
                      <div className="valid-feedback">
                      </div>
                    </div>


                    <div className="col-md-4">
                      <label htmlFor="validationCustom04" className="form-label">Tipo Documento</label>
                      <select className="form-select" id="validationCustom04" required>
                        <option selected disabled value="">Elige...</option>
                        <option>Cédula de Ciudadania</option>
                        <option>Tarjeta de Identidad</option>
                        <option>Registro Civil</option>
                        <option>Cedula Extranjera</option>
                        <option>Número de Pasaporte</option>
                        <option>NIT</option>

                      </select>
                      <div className="invalid-feedback">
                        Selecciona un estado válido.
                      </div>
                    </div>


                    <div className="col-md-4">
                      <label htmlFor="validationCustom02" className="form-label">Numero de Identificacion</label>
                      <input type="text" className="form-control" id="validationCustom02" required />
                      <div className="valid-feedback">
                      </div>
                    </div>


                    <div className="col-md-4">
                      <label htmlFor="validationCustom02" className="form-label">Proveedores col</label>
                      <input type="text" className="form-control" id="validationCustom02" required />
                      <div className="valid-feedback">
                      </div>
                    </div>


                    <div className="col-md-4">
                      <label htmlFor="validationCustom02" className="form-label">Razon Social</label>
                      <input type="text" className="form-control" id="validationCustom02" required />
                      <div className="valid-feedback">
                      </div>
                    </div>



                    <div className="col-md-4">
                      <label htmlFor="validationCustom01" className="form-label"> Primer Nombre</label>
                      <input type="text" className="form-control" id="validationCustom01" required />
                      <div className="valid-feedback">
                      </div>
                    </div>


                    <div className="col-md-4">
                      <label htmlFor="validationCustom01" className="form-label">Segundo Nombre</label>
                      <input type="text" className="form-control" id="validationCustom01" required />
                      <div className="valid-feedback">
                      </div>
                    </div>


                    <div className="col-md-4">
                      <label htmlFor="validationCustom02" className="form-label">Primer Apellido</label>
                      <input type="text" className="form-control" id="validationCustom02" required />
                      <div className="valid-feedback">
                      </div>
                    </div>


                    <div className="col-md-4">
                      <label htmlFor="validationCustom02" className="form-label">Segundo Apellido</label>
                      <input type="text" className="form-control" id="validationCustom02" required />
                      <div className="valid-feedback">
                      </div>
                    </div>


                    <div className="col-md-4">
                      <label htmlFor="validationCustom02" className="form-label">Proveedores col 1</label>
                      <input type="text" className="form-control" id="validationCustom02" required />
                      <div className="valid-feedback">
                      </div>
                    </div>


                    <div className="col-md-4">
                      <label htmlFor="validationCustom02" className="form-label"> Tipo de Proveedor</label>
                      <input type="text" className="form-control" id="validationCustom02" required />
                      <div className="valid-feedback">
                      </div>
                    </div>


                    <div className="col-md-4">
                      <label htmlFor="validationCustom02" className="form-label">Telefono 1</label>
                      <input type="text" className="form-control" id="validationCustom02" required />
                      <div className="valid-feedback">
                      </div>
                    </div>


                    <div className="col-md-4">
                      <label htmlFor="validationCustom02" className="form-label">Telefono2</label>
                      <input type="text" className="form-control" id="validationCustom02" required />
                      <div className="valid-feedback">
                      </div>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="validationCustom02" className="form-label">Correo Electronico</label>
                      <input type="email" className="form-control" id="validationCustom02" required />
                      <div className="valid-feedback">
                      </div>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="validationCustom02" className="form-label">WhatsApp</label>
                      <input type="text" className="form-control" id="validationCustom02" required />
                      <div className="valid-feedback">
                      </div>
                    </div>


                    <div className="col-md-4">
                      <label htmlFor="validationCustom02" className="form-label">Pais</label>
                      <input type="text" className="form-control" id="validationCustom02" required />
                      <div className="valid-feedback">
                      </div>
                    </div>


                    <div className="col-md-4">
                      <label htmlFor="validationCustom02" className="form-label">Departamento</label>
                      <input type="text" className="form-control" id="validationCustom02" required />
                      <div className="valid-feedback">
                      </div>
                    </div>


                    <div className="col-md-4">
                      <label htmlFor="validationCustom02" className="form-label">Municipio/Ciudad</label>
                      <input type="text" className="form-control" id="validationCustom02" required />
                      <div className="valid-feedback">
                      </div>
                    </div>


                    <div className="col-md-4">
                      <label htmlFor="validationCustom03" className="form-label">Direccion</label>
                      <input type="text" className="form-control" id="validationCustom03" required />
                      <div className="invalid-feedback">
                        Proporciona una ciudad válida.
                      </div>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="validationCustom02" className="form-label">Proveedores col 2</label>
                      <input type="text" className="form-control" id="validationCustom02" required />
                      <div className="valid-feedback">
                      </div>
                    </div>

                  </form>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                  <button type="button" className="btn text-white" style={{ backgroundColor: "#008cba" }}>Guardar Registro</button>
                </div>

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
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>
                  <span style={{ border: "1px solid silver", borderRadius: "0.25em", padding: "0.5em" }} className='me-2'> <i className="fa-solid fa-pencil space-i"></i></span>
                  <span style={{ border: "1px solid silver", borderRadius: "0.25em", padding: "0.5em" }} className='me-2'><i className="fa-solid fa-trash"></i></span>
                </td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>
                  <span style={{ border: "1px solid silver", borderRadius: "0.25em", padding: "0.5em" }} className='me-2'> <i className="fa-solid fa-pencil space-i"></i></span>
                  <span style={{ border: "1px solid silver", borderRadius: "0.25em", padding: "0.5em" }} className='me-2'><i className="fa-solid fa-trash"></i></span>
                </td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>
                  <span style={{ border: "1px solid silver", borderRadius: "0.25em", padding: "0.5em" }} className='me-2'> <i className="fa-solid fa-pencil space-i"></i></span>
                  <span style={{ border: "1px solid silver", borderRadius: "0.25em", padding: "0.5em" }} className='me-2'><i className="fa-solid fa-trash"></i></span>
                </td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>
                  <span style={{ border: "1px solid silver", borderRadius: "0.25em", padding: "0.5em" }} className='me-2'> <i className="fa-solid fa-pencil space-i"></i></span>
                  <span style={{ border: "1px solid silver", borderRadius: "0.25em", padding: "0.5em" }} className='me-2'><i className="fa-solid fa-trash"></i></span>
                </td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>
                  <span style={{ border: "1px solid silver", borderRadius: "0.25em", padding: "0.5em" }} className='me-2'> <i className="fa-solid fa-pencil space-i"></i></span>
                  <span style={{ border: "1px solid silver", borderRadius: "0.25em", padding: "0.5em" }} className='me-2'><i className="fa-solid fa-trash"></i></span>
                </td>
              </tr>


            </tbody>
          </table>

        </div>






      </div>
    </div>



  )
}

export default Proveedores