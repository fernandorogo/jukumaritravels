import React, { useState, useEffect } from 'react';
import Navibar from '../components/Navibar'
import Footer from '../components/Footer'
import axios from 'axios'

const DestinosTuristicos = () => {

  const [destinos, setDestinos] = useState([]);

 
  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    try {
      const { data } = await axios.get(`/api/destinos/listall`);
      setDestinos(data.destinos)

    } catch (error) {
      if (!error.response.data.ok) {
        return alert(error.response.data.mensaje)
      }
      console.log("error en la función getData", error.message)

    }
  }

  return (
    <div>
      <Navibar />

      <div className='card-galery mt-4'>
        <div className='container'>
          <div className='heading text-center mb-4'>
            <h2 className='fw-bold'>
              Nuestros Destinos Turísticos
            </h2>
            <div className='row row-cols-1 row-cols-md-3 g-4'>

              {Array.isArray(destinos) && destinos.map((item) =>
              (
                <div className='col-12 col-md-6 col-xl-4' key={item._id}>
                  <div className='card h-100 border-0 transform-on-hover shadow'>

                    <img src={item.img} className='card-img-top'></img>
                    <div className='card-body'>
                      <h6 className='card-title fw-bold'>{item.nombreDestino}</h6>
                      <p className='card-text'>{item.ubicacion}</p>
                      <p className=' card-text'>{item.descripcionDestino}</p>
                    </div>
                  </div>
                </div>

              ))}
            </div>
          </div>
        </div>


      </div>

      <Footer />
    </div>


  );
};

export default DestinosTuristicos;
