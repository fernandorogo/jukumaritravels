import React from 'react'

const Cliente = () => {
  return (
    <div>
      <div className='container-md mt-5'>

        <button type="button" className="btn btn-primary" style={{ backgroundColor: "#008cba" }} data-bs-toggle="modal" data-bs-target="#exampleModal">
          < i className="fa-solid fa-plus fa-beat fa-lg me-2" style={{ color: "#ffffff" }}></i>CLIENTES
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header" style={{ backgroundColor: "#008cba" }}>
                <h5 className="modal-title text-white" id="exampleModalLabel">Ingreso de Clientes</h5>
                <button type="button" className="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form className="needs-validation" noValidate>
                  <div className="row g-3">
                    <div className="col-md-3">
                      <label htmlFor="codigoCliente" className="form-label">Codigo Cliente</label>
                      <input type="number" className="form-control" id="codigoCliente" required />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="primerNombre" className="form-label">Primer Nombre</label>
                      <input type="text" className="form-control" id="primerNombre" required />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="segundoNombre" className="form-label">Segundo Nombre</label>
                      <input type="text" className="form-control" id="segundoNombre" required />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="primerApellido" className="form-label">Primer Apellido</label>
                      <input type="text" className="form-control" id="primerApellido" required />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="segundoApellido" className="form-label">Segundo Apellido</label>
                      <input type="text" className="form-control" id="segundoApellido" required />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="tipoDocumento" className="form-label">Tipo Documento</label>
                      <select className="form-select" id="tipoDocumento" required>
                        <option selected disabled value="">Elige...</option>
                        <option>Cédula de Ciudadania</option>
                        <option>Tarjeta de Identidad</option>
                        <option>Registro Civil</option>
                        <option>Cedula Extranjera</option>
                        <option>Número de Pasaporte</option>
                      </select>
                      <div className="invalid-feedback">Selecciona un estado válido.</div>
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="numIdentificacion" className="form-label">Numero de Identificacion</label>
                      <input type="text" className="form-control" id="numIdentificacion" required />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento</label>
                      <input type="date" className="form-control" id="fechaNacimiento" required />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="esMenorEdad" className="form-label">Es menor de edad</label>
                      <select className="form-select" id="esMenorEdad" required>
                        <option selected disabled value="">Elige...</option>
                        <option>SI</option>
                        <option>NO</option>
                      </select>
                      <div className="invalid-feedback">Selecciona un estado válido.</div>
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="parentezco" className="form-label">Parentezco (si es menor de edad)</label>
                      <select className="form-select" id="parentezco" required>
                        <option selected disabled value="">Elige...</option>
                        <option>Madre</option>
                        <option>Padre</option>
                        <option>Hermano mayor de edad</option>
                        <option>Tutor legal</option>
                        <option>Otro</option>
                      </select>
                      <div className="invalid-feedback">Selecciona un estado válido.</div>
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="otroParentezco" className="form-label">¿Cual?</label>
                      <input type="text" className="form-control" id="otroParentezco" required />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="tipoDocTitular" className="form-label">Tipo Documento Titular</label>
                      <select className="form-select" id="tipoDocTitular" required>
                        <option selected disabled value="">Elige...</option>
                        <option>Cédula de Ciudadania</option>
                        <option>Tarjeta de Identidad</option>
                        <option>Registro Civil</option>
                        <option>Cedula Extranjera</option>
                        <option>Número de Pasaporte</option>
                      </select>
                      <div className="invalid-feedback">Selecciona un estado válido.</div>
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="numDocTitular" className="form-label">Numero de Identificacion</label>
                      <input type="text" className="form-control" id="numDocTitular" required />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="correoElectronico" className="form-label">Correo Electronico</label>
                      <input type="email" className="form-control" id="correoElectronico" required />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="telefono1" className="form-label">Telefono 1</label>
                      <input type="text" className="form-control" id="telefono1" required />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="telefono2" className="form-label">Telefono 2</label>
                      <input type="text" className="form-control" id="telefono2" required />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="pais" className="form-label">Pais</label>
                      <input type="text" className="form-control" id="pais" required />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="departamento" className="form-label">Departamento</label>
                      <input type="text" className="form-control" id="departamento" required />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="municipio" className="form-label">Municipio/Ciudad</label>
                      <input type="text" className="form-control" id="municipio" required />
                    </div>

                    <div className="col-md-12">
                      <label htmlFor="direccionPrincipal" className="form-label">Dirección principal</label>
                      <input type="text" className="form-control" id="direccionPrincipal" required />
                      <div className="invalid-feedback">Proporciona una dirección válida.</div>
                    </div>
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



    <h1>PRUEBA</h1>
    </div>


  )
}

export default Cliente