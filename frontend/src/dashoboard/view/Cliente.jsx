import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const Cliente = () => {
  const [clientes, setClientes] = useState([])
  const [nombre1Cliente, setnombre1Cliente] = useState('')
  const [nombre2Cliente, setnombre2Cliente] = useState('')
  const [apellido1Cliente, setapellido1Cliente] = useState('')
  const [apellido2Cliente, setapellido2Cliente] = useState('')
  const [tipodocumentoCliente, settipodocumentoCliente] = useState('')
  const [documentoCliente, setdocumentoCliente] = useState('')
  const [correoelectronicoCliente, setcorreoelectronicoCliente] = useState('')
  const [telefono1Cliente, settelefono1Cliente] = useState('')
  const [telefono2Cliente, settelefono2Cliente] = useState('')
  const [direccionCliente, setdireccionCliente] = useState('')
  const [fechanacimientoCliente, setfechanacimientoCliente] = useState('');
  const [paisCliente, setpaisCliente] = useState('');
  const [departamentoCliente, setdepartamentoCliente] = useState('');
  const [municipioCliente, setmunicipioCliente] = useState('');
  const [documentoTitular, setdocumentoTitular] = useState('')
  const [parentezcoCliente, setparentezcoCliente] = useState('')
  const [esMenorEdad, setEsMenorEdad] = useState('NO');

  useEffect(() => {
    getData();
  }, []);

  const cleanData = () => {
    setClientes('')
    setnombre1Cliente('')
    setnombre2Cliente('')
    setapellido1Cliente('')
    setapellido2Cliente('')
    settipodocumentoCliente('')
    setdocumentoCliente('')
    setcorreoelectronicoCliente('')
    settelefono1Cliente('')
    settelefono2Cliente('')
    setfechanacimientoCliente('');
    setpaisCliente('');
    setdepartamentoCliente('');
    setmunicipioCliente('');
    setdocumentoTitular('')
    setparentezcoCliente('')
    setdireccionCliente('')

  }

  const getData = async () => {
    const { data } = await axios.get("http://localhost:4000/api/clientes/");
    setClientes(data.clientes);
  };

  const saveCliente = async () => {
    try {
      const newCliente = {
        nombre1Cliente,
        nombre2Cliente,
        apellido1Cliente,
        apellido2Cliente,
        tipodocumentoCliente,
        documentoCliente,
        correoelectronicoCliente,
        telefono1Cliente,
        telefono2Cliente,
        fechanacimientoCliente,
        direccionCliente,
        paisCliente,
        departamentoCliente,
        municipioCliente,

      }
      await axios.post('http://localhost:4000/api/clientes/', newCliente);
      cleanData();
      getData();
    } catch (error) {
      if (!error.response.data.ok) {
        return alert(error.response.data.message)
      }
      console.log('error en saveCliente', error.message);

    }
  }

  const actions = (e) => {
    e.preventDefault();
    saveCliente();
  };



  const deleteCliente = async (id) => {
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
          const { data } = await axios.delete('http://localhost:4000/api/clientes/' + id);
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
      console.log('error en deleteCliente', error.message);
    }
  }

  const handleEsMenorEdadChange = (e) => {
    setEsMenorEdad(e.target.value);
  };



  return (
    <div>
      {/* Inicio del formulario*/}
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
                <form onSubmit={actions}>
                  <div className="row g-3">

                    <div className="col-md-3">
                      <label htmlFor="primerNombre" className="form-label">Primer Nombre</label>
                      <input type="text" className="form-control" id="primerNombre"
                        value={nombre1Cliente}
                        onChange={(e) => setnombre1Cliente(e.target.value.toUpperCase())}
                        required
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="segundoNombre" className="form-label">Segundo Nombre</label>
                      <input type="text" className="form-control" id="segundoNombre"
                        value={nombre2Cliente}
                        onChange={(e) => setnombre2Cliente(e.target.value.toUpperCase())}
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="primerApellido" className="form-label">Primer Apellido</label>
                      <input type="text" className="form-control" id="primerApellido"
                        value={apellido1Cliente}
                        onChange={(e) => setapellido1Cliente(e.target.value.toUpperCase())}
                        required />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="segundoApellido" className="form-label">Segundo Apellido</label>
                      <input type="text" className="form-control" id="segundoApellido"
                        value={apellido2Cliente}
                        onChange={(e) => setapellido2Cliente(e.target.value.toUpperCase())}
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="tipoDocumento" className="form-label">Tipo Documento</label>
                      <select className="form-select" id="tipoDocumento"
                        value={tipodocumentoCliente}
                        onChange={(e) => settipodocumentoCliente(e.target.value.toUpperCase())}
                        required>
                        <option selected disabled value="">Elige...</option>
                        <option value="RC">REGISTRO CIVIL</option>
                        <option value="TI">TARJETA DE IDENTIAD</option>
                        <option value="CC">CEDULA DE CIUDADANIA</option>
                        <option value="PASS">PASSAPORTE</option>
                        <option value="CE">CEDULA DE EXTRANJERIA</option>
                      </select>
                      <div className="invalid-feedback">Selecciona un estado válido.</div>
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="numIdentificacion" className="form-label">Numero de Identificación</label>
                      <input type="text" className="form-control" id="numIdentificacion"
                        value={documentoCliente}
                        onChange={(e) => setdocumentoCliente(e.target.value)}
                        required />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento</label>
                      <input type="date" className="form-control" id="fechaNacimiento"
                        value={fechanacimientoCliente}
                        onChange={(e) => setfechanacimientoCliente(e.target.value)}
                        required />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="correoElectronico" className="form-label">Correo Electronico</label>
                      <input type="email" className="form-control" id="correoElectronico"
                        value={correoelectronicoCliente}
                        onChange={(e) => setcorreoelectronicoCliente(e.target.value)}
                        required />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="telefono1" className="form-label">Telefono 1</label>
                      <input type="text" className="form-control" id="telefono1"
                        value={telefono1Cliente}
                        onChange={(e) => settelefono1Cliente(e.target.value)}
                        required />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="telefono2" className="form-label">Telefono 2</label>
                      <input type="text" className="form-control" id="telefono2"
                        value={telefono2Cliente}
                        onChange={(e) => settelefono2Cliente(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="direccionPrincipal" className="form-label">Dirección principal</label>
                      <input type="text" className="form-control" id="direccionPrincipal"
                        value={direccionCliente}
                        onChange={(e) => setdireccionCliente(e.target.value.toUpperCase())}
                      />
                      <div className="invalid-feedback">Proporciona una dirección válida.</div>
                    </div>

                    <div className="col-md-3">
                      <label htmlFor="pais" className="form-label">Pais</label>
                      <input type="text" className="form-control" id="pais"
                        value={paisCliente}
                        onChange={(e) => setpaisCliente(e.target.value.toUpperCase())} />
                    </div>

                    <div className="col-md-3">
                      <label htmlFor="departamento" className="form-label">Departamento</label>
                      <input type="text" className="form-control" id="departamento" value={departamentoCliente}
                        onChange={(e) => setdepartamentoCliente(e.target.value.toUpperCase())} />
                    </div>

                    <div className="col-md-3">
                      <label htmlFor="municipio" className="form-label">Municipio/Ciudad</label>
                      <input type="text" className="form-control" id="municipio" value={municipioCliente}
                        onChange={(e) => setmunicipioCliente(e.target.value.toUpperCase())} />
                    </div>

                    
                    {/* ... (código existente) ... */}
                    <div className="col-md-3">
                      <label htmlFor="esMenorEdad" className="form-label">Es menor de edad</label>
                      <select className="form-select" id="esMenorEdad" value={esMenorEdad} onChange={handleEsMenorEdadChange} required>
                        <option selected disabled value="">Elige...</option>
                        <option value="SI">SI</option>
                        <option value="NO">NO</option>
                      </select>
                      <div className="invalid-feedback">Selecciona un estado válido.</div>
                    </div>
                    {esMenorEdad === 'SI' && (
                      <>
                        <div className="col-md-3">
                          <label htmlFor="parentezco" className="form-label">Parentezco (si es menor de edad)</label>
                          <select className="form-select" id="parentezco" value={parentezcoCliente} onChange={(e) => setparentezcoCliente(e.target.value)} required>
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
                          <input type="text" className="form-control" id="numDocTitular" value={documentoTitular} onChange={(e) => setdocumentoTitular(e.target.value)} required />
                        </div>
                      </>
                    )}
                    {/* ... (código existente) ... */}
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                    <button type="submit" className="btn btn-primary">Guardar Registro</button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
      {/* Fin del formulario*/}

      {/* Inicio de la tabla de Clientes*/}
      <div className='container-md responsive'>
        <table className="table table-bordered table-hover mt-5">
          <thead>
            <tr className='table-dark'>
              <th scope="col">#</th>
              <th scope="col">Nombre1</th>
              <th scope="col">Nombre2</th>
              <th scope="col">Apellido1</th>
              <th scope="col">Apellido2</th>
              <th scope="col">Tipo Doc</th>
              <th scope="col">Documento</th>
              <th scope="col">Telefono</th>
              <th scope="col">Email</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(clientes) && clientes.map((item, i) => (
              <tr key={item._id}>
                <td>{i + 1}</td>
                <td>{item.nombre1Cliente}</td>
                <td>{item.nombre2Cliente}</td>
                <td>{item.apellido1Cliente}</td>
                <td>{item.apellido2Cliente}</td>
                <td>{item.tipodocumentoCliente}</td>
                <td>{item.documentoCliente}</td>
                <td>{item.telefono1Cliente}</td>
                <td>{item.correoelectronicoCliente}</td>

                <td>

                  <span style={{ border: "1px solid silver", borderRadius: "0.25em", padding: "0.5em" }} className='me-2 btn-primary'> <i className="fa-solid fa-pencil space-i "></i></span>
                  <span style={{ border: "1px solid silver", borderRadius: "0.25em", padding: "0.5em" }} className='me-2 btn-danger'
                    onClick={() => deleteCliente(item._id)}
                  ><i className="fa-solid fa-trash"></i></span>

                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
      {/* Fin de la tabla de Clientes*/}
    <h1>PRUEBA</h1>
    </div>
  )
}

export default Cliente