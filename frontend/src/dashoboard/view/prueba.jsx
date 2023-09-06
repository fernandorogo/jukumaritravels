{/* Inicio de la tabla de Clientes*/ }
<div className='container container-flex card Larger shadow mt-3'>
    <div className="card-header d-flex justify-content-between align-items-center">
        <div className="dropdown no-arrow align-items-center">
            <button className="btn btn-link btn-sm dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown" type="button">
                <i className="fas fa-ellipsis-v text-gray-400"></i>
            </button>
            <div className="dropdown-menu shadow dropdown-menu-end animated--fade-in">
                <p className="text-center dropdown-header">Exportar:</p>
                <Link className="dropdown-item" href="#">
                    <i class="fa-solid fa-file-pdf me-2"></i>Pdf
                </Link>
                <Link className="dropdown-item" href="#">
                    <i class="fa-solid fa-file-excel me-2"></i> Excel
                </Link>
                <div className="dropdown-divider"></div><Link className="dropdown-item" href="#"> Somem</Link>
            </div>
        </div>
        <div>
            <h6 className="text-primary fw-bold m-0 mt-1 text-start">Lista de Clientes</h6>
        </div>

        <div>
            <input className="form-control me-5" aria-label="Search"
                type="text"
                placeholder="Buscar cliente..."
                value={searchTerm}
                onChange={handleSearch}
            />
        </div>
        <div>
            <button type="button" className="btn btn-primary rounded-circle aling-end" style={{ backgroundColor: "#008cba" }} onClick={() => {
                setIsModalOpen(true); // Abre la modal al hacer clic
            }} title="Haga clic para agregar un nuevo cliente">< i className="fa-solid fa-plus fa-beat "></i></button>
        </div>

    </div>
    {/* Mostrar tabla solo en dispositivos grandes (computadoras) */}
    <div className='d-none d-md-block'>
        <div className="table-responsive">
            <table className='table table-bordered border-1 table-hover mt-2'>
                {/* ... contenido de la tabla ... */}
                <thead>
                    <tr style={{ background: "#008cba", color: "#ffffff" }}>
                        <th scope="col" className="responsive-text">#</th>
                        <th scope="col-2" className="responsive-text">Nombre1</th>
                        <th scope="col" className="responsive-text">Nombre2</th>
                        <th scope="col" className="responsive-text">Apellido1</th>
                        <th scope="col" className="responsive-text">Apellido2</th>
                        <th scope="col" className="responsive-text">Tipo</th>
                        <th scope="col" className="responsive-text">Documento</th>
                        <th scope="col" className="responsive-text">Email</th>
                        <th scope="col" className="responsive-text">Telefono1</th>
                        <th scope="col" className="responsive-text">Titular</th>
                        {/*<th scope="col">F Nacimiento</th>*/}
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(filteredClientes) && filteredClientes.map((item, i) => (
                        <tr key={item._id}>
                            <td className="responsive-text">{i + 1}</td>
                            <td className="responsive-text">{item.nombre1Cliente}</td>
                            <td className="responsive-text">{item.nombre2Cliente}</td>
                            <td className="responsive-text">{item.apellido1Cliente}</td>
                            <td className="responsive-text">{item.apellido2Cliente}</td>
                            <td className="responsive-text">{item.tipodocumentoCliente}</td>
                            <td className="responsive-text">{item.documentoCliente}</td>
                            <td className="responsive-text">{item.correoelectronicoCliente}</td>
                            <td className="responsive-text">{item.telefono1Cliente}</td>
                            <td className="responsive-text">{item.documentoTitular}</td>
                            {/*<td>{DateTime.fromISO(item.fechanacimientoCliente).toFormat('dd/LL/yyyy')}</td>*/}



                            <td>
                                <div className="btn-group btn-group-sm" role="group">
                                    <span className='btn btn-primary d-flex align-items-center me-2' onClick={() => editData(item)}>
                                        <i className="fa-solid fa-pencil space-i"></i>
                                    </span>
                                    <span className='btn btn-danger d-flex align-items-center'
                                        onClick={() => deleteCliente(item._id)}
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </span>
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
        {Array.isArray(clientes) && clientes.map((item, i) => (
            <div key={item._id} className='card border-3'>
                {/* Contenido de la tarjeta */}
                <div className='card-body'>
                    <h5 className='card-title'>Cliente {i + 1}</h5>
                    <p className='card-text'>
                        <strong>Nombre1:</strong> {item.nombre1Cliente}<br />
                        <strong>Nombre2:</strong> {item.nombre2Cliente}<br />
                        <strong>Apellido1:</strong> {item.apellido1Cliente}<br />
                        <strong>Apellido2:</strong> {item.apellido2Cliente}<br />
                        <strong>Tipo Doc:</strong> {item.tipodocumentoCliente}<br />
                        <strong>Documento:</strong> {item.documentoCliente}<br />
                        <strong>Telefono:</strong> {item.telefono1Cliente}<br />
                        <strong>Email:</strong> {item.correoelectronicoCliente}
                        <strong>Doc Titular:</strong> {item.documentoTitular}
                        <strong></strong>
                    </p>
                    <div className='btn-group btn-group-xl'>
                        <span className='btn btn-primary d-flex align-items-center me-2'>
                            <i className="fa-solid fa-pencil space-i"></i>
                        </span>
                        <span className='btn btn-danger d-flex align-items-center'
                            onClick={() => deleteCliente(item._id)}
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

{/* Fin de la tabla de Clientes*/ }