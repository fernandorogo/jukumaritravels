import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Pasajeros = () => {

    //-----------------------Validacion de Cliente--------------------------------
    const [validacionesClientes, setValidacionesClientes] = useState([]);

    const [nombreCompleto, setNombreCompleto] = useState('');
    const [documentoCliente, setDocumentoCliente] = useState('')
    const [clientes, setClientes] = useState([]);

    // Esta funcion permite hacer una consulta Get al servidor buscando un id de cliente
    const fetchClientes = async () => {
        fetch('/api/clientes')
            .then(response => response.text())
            .catch(error => console.error('Error fetching clientes:', error));
    };

    const fetchListarClientes = async () => {
        return fetch('/api/clientes/listall')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al obtener la lista de clientes');
                }
                return response.json();
            })
            .then((data) => {
                return data.clientes.map(cliente => ({ ...cliente, documentoCliente: '', nombreCliente: '', validacionDocumento: null }));
            })
            .catch((error) => {
                console.error('Error al obtener la lista de clientes:', error);
                throw error; // Puedes lanzar el error nuevamente para que lo manejen en otro lugar si es necesario.
            });
    };


    useEffect(() => {
        fetchClientes();
        fetchListarClientes()
            .then((clientesData) => {
                setClientes(clientesData);
            });


    }, []);

    const handleDocumentoClienteChange = async (e, index) => {
        const value = e.target.value;

        try {
            const response = await axios.get(`/api/clientes/verificar/${value}`);
            if (response.data.exists) {
                const { nombreCompleto } = response.data;
                setClientes((prevClientes) =>
                    prevClientes.map((cliente, i) =>
                        i === index ? { ...cliente, validacionDocumento: true, nombreCliente: nombreCompleto } : cliente
                    )
                );
            } else {
                setClientes((prevClientes) =>
                    prevClientes.map((cliente, i) =>
                        i === index ? { ...cliente, validacionDocumento: false, nombreCliente: '' } : cliente
                    )
                );
            }
        } catch (error) {
            console.error('Error al validar el documento:', error);
            setClientes((prevClientes) =>
                prevClientes.map((cliente, i) =>
                    i === index ? { ...cliente, validacionDocumento: false, nombreCliente: '' } : cliente
                )
            );
        }
    };

    //----------------------------Todo para los pasajeros-------------------------

    const handleAddClienteRow = () => {
        // Crea una nueva fila de cliente con valores iniciales
        const newCliente = {
            documentoCliente: '',
            nombreCliente: '',
            validacionDocumento: null,
        };

        // Agrega la nueva fila al estado de pasajeros
        setClientes([...clientes, newCliente]);
    };

    return (
        <div>
            <div className="col-md-12">
                <button
                    type="button"
                    className="btn btn-success mt-2"
                    onClick={handleAddClienteRow}
                >
                    Agregar Detalles
                </button>
            </div>
            <div>
                <table className="table table-hover mt-2">
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope="col" className="col-md-4 mb-3" >Documento</th>
                            <th scope="col" className="col-md-8 mb-3">Pasajeros</th>
                            <th scope="col" className="col-md-8 mb-3">idPaquete</th>
                            <th scope="col" className="col-md-4 mb-3">Acción</th>
                        </tr>
                    </thead>
                    <tbody style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        {clientes.map((cliente, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <input
                                        type="text"
                                        className={`form-control ${cliente.validacionDocumento === true ? 'is-valid' : cliente.validacionDocumento === false ? 'is-invalid' : ''}`}
                                        id={`documentoCliente_${index}`}
                                        value={cliente.documentoCliente}
                                        onBlur={(e) => handleDocumentoClienteChange(e, index)}
                                        onChange={(e) =>
                                            setClientes((prevClientes) =>
                                                prevClientes.map((c, i) =>
                                                    i === index ? { ...c, documentoCliente: e.target.value } : c
                                                )
                                            )
                                        }
                                        required
                                        
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={cliente.nombreCliente}
                                        onChange={(e) =>
                                            setClientes((prevClientes) =>
                                                prevClientes.map((c, i) =>
                                                    i === index ? { ...c, nombreCliente: e.target.value } : c
                                                )
                                            )
                                        }
                                        readOnly
                                    />
                                </td>
                                <td>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="idReserva"
                                        value={cliente.idReserva}
                                        onChange={(e) => {
                                            setClientes((prevClientes) =>
                                                prevClientes.map((c, i) =>
                                                    i === index ? { ...c, idReserva: e.target.value } : c
                                                )
                                            );
                                        }}
                                    />
                                </td>
                                <td>
                                    <div className="btn-group btn-group-sm" role="group">
                                        <span className='btn btn-danger me-2' >
                                            <i className="fa-solid fa-trash"></i>
                                        </span>
                                        <span className='btn btn-success' >
                                            <i className="fa-solid fa-plus"></i>
                                        </span>
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

export default Pasajeros
