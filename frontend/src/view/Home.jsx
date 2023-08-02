import React from 'react';
import Navibar from '../components/Navibar';
import image1 from '../assets/images/image1.png';
import step1 from '../assets/images/step1.png';
import step2 from '../assets/images/step2.png';
import step3 from '../assets/images/step3.png';
import carrousel1 from "../image/carrousel1.jpg"
import carrousel2 from "../image/carrousel2.jpg"
import carrousel3 from "../image/carrousel3.jpg"
import carrousel4 from "../image/carrousel4.jpg"
import videoplaya from '../image/videoplaya720.mp4';
import MapContainer from '../view/MapContainer';


import Footer from '../components/Footer'
import { Link } from 'react-router-dom';

const Page = () => {


  return (
    <div>
      <Navibar/>
      <>

        <div>
          {/* Slider Home  */}
          <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={carrousel1} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={carrousel2} className="d-block w-100 " alt="..." />
              </div>
              <div className="carousel-item">
                <img src={carrousel3} className="d-block w-100 " alt="..." />
              </div>
              <div className="carousel-item">
                <img src={carrousel4} className="d-block w-100 " alt="..." />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Anterior</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Siguiente</span>
            </button>

          </div>
        </div>
        <br />

        {/* Content1  */}
        <div className="container" style={{ marginTop: '3%' }}>
          <div className="row">
            <div className="col-md-12 col-lg-6">
              <div className="container"><img src={image1} style={{ width: '75%' }} alt="" /></div>
            </div>
            <div className="col-md-12 col-lg-6">
              <div className="container" style={{ marginTop: '7%' }}>
                <div className="base_header"><span><small className="bor_header_left"></small>Elije tus VACACIONES<small className="bor_header_right"></small></span>
                  <h3>Nosotros las hacemos realidad.</h3>
                </div>
                <div className="base_footer">
                  <p>Si estás pensando en viajar, planea tus vacaciones con Jukumari Travels y no dejes de vivir una experiencia inolvidable al lado de tu pareja, amigos, o familiares. <br /><br />Deja todo en nuestras manos y dedícate a disfrutar y a que te atiendan como te lo mereces.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />

        {/* Content2  */}
        <div className="steps">
          <div className="base_header text-center" style={{ paddingTop: '2%' }}><span><small className="bor_header_left"></small>SOMOS TODO LO QUE BUSCAS<small className="bor_header_right"></small></span>
            <h3>¿Por que viajar con Nosotros?</h3>
          </div>
          <div className="container" style={{ marginTop: "3%", paddingBottom: '3%' }} >
            <div className="row">
              <div className="col-md-4 text-center steps">
                <div><img src={step2} alt="step2" style={{ width: '50%' }} />
                  <h4><strong>Confianza</strong></h4>
                  <h4>...</h4>
                </div>
              </div>
              <div className="col-md-4 text-center steps">
                <div><img src={step1} alt="step1" style={{ width: '50%' }} />
                  <h4><strong>Calidad en el servicio</strong></h4>
                  <h4>...</h4>
                </div>
              </div>

              <div className="col-md-4 text-center steps">
                <div><img src={step3} alt="step3" style={{ width: '50%' }} />
                  <h4><strong>Pasión y compromiso</strong></h4>
                  <h4>...</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PlayStore */}
        <div style={{ background: '#008CBA', padding: '2%' }}>
          <div className="container" >
            <div className="row">
              <div className="col-md-12 col-lg-5">
                <div className="container" style={{ marginTop: '7%' }}>
                  <div className="base_header">
                    {/* <h3>Simple way to Book Your Maid Faster</h3> */}
                    <h3 style={{ color: 'white' }}>Tiempo de Calidad</h3>
                  </div>
                  <div className="base_footer">
                    <p style={{ color: 'white' }}>"Descubre la magia y la serenidad del ocaso en nuestras playas: donde los sueños se funden con la brisa del mar. Sumérgete en la belleza infinita y despierta tu espíritu aventurero al ritmo de atardeceres inolvidables. <br /> <br />Vive la experiencia del turismo paradisíaco, donde las vistas bañadas en colores dorados te transportarán a un mundo de ensueño."</p>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-lg-7">
                <div className="container" style={{ padding: '7%' }}>
                  <div className="embed-responsive embed-responsive-16by9">
                    <video controls width="100%" height="365" className='border border-3 rounded-top '>
                      <source src={videoplaya} type="video/mp4" />
                      Tu navegador no soporta el elemento de video.
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content4  */}
        <div className="container" style={{ marginTop: '7%' }}>
          <div className="row">
            <div className="col-md-12 col-lg-6">
              <div className="container"><MapContainer /></div>
            </div>
            <div className="col-md-12 col-lg-6">
              <div className="container" style={{ marginTop: '7%' }}>
                <div className="base_header">
                  <span>
                    <small className="bor_header_left"></small>Local Físico
                    <small className="bor_header_right"></small>
                  </span>
                  <h3>Dónde nos Ubicamos.</h3>
                </div>
                <div className="base_footer">
                  <p><strong>Atención de Calidad</strong>
                    <br />
                    Estamos ubicados en el Centro comercial
                    <h3>Plaza Real</h3>
                    Segundo piso <h3>L-205</h3>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        






        <br />

        {/* Service List  */}

        {/*<div className="container" style={{ marginTop: '5%' }}>
          <div className="base_header"><h3>Our Services</h3>
            <span style={{ padding: '2%' }}><a href="/service" >MORE SERVICES →</a></span>
          </div>
          <br />
          <div className="container">
            <div className="row">
              <div
                className="col-md-6 col-lg-4 col-xl-4"
                style={{ marginTop: "2%" }}
              >
                <div className="card category-card" key="1">
                  <img
                    className="card-img-top w-100 d-block"
                    src={Service1}
                    alt="service1"
                  />
                  <div className="card-body">
                    <h4 className="card-title">Service Name</h4>
                  </div>
                </div>
              </div>


              <div
                className="col-md-6 col-lg-4 col-xl-4"
                style={{ marginTop: "2%" }}
              >
                <div className="card category-card" key="1">
                  <img
                    className="card-img-top w-100 d-block"
                    src={Service1}
                    alt="service1"
                  />
                  <div className="card-body">
                    <h4 className="card-title">Service Name</h4>
                  </div>
                </div>
              </div>


              <div
                className="col-md-6 col-lg-4 col-xl-4"
                style={{ marginTop: "2%" }}
              >
                <div className="card category-card" key="1">
                  <img
                    className="card-img-top w-100 d-block"
                    src={Service1}
                    alt="service1"
                  />
                  <div className="card-body">
                    <h4 className="card-title">Service Name</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />
        */}
      </>
      <div>
        <Link to="https://wa.me/573043635185?text=Necesito%20más%20información%20sobre%20planes%20turísticos.%20Mensaje%20automático%20desde%20la%20pagina%20Web" className="whatsapp" target="_blank"> <i className="fa fa-whatsapp whatsapp-icon"></i></Link>
      </div>

      <Footer />
    </div>
  )
}

export default Page
