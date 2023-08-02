import React from 'react';
import Navibar from '../components/Navibar'
import image1 from '../assets/images/image1.png';
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';

const Nosotros = () => {


  return (
    <div>
      <Navibar/>
      <div>

        <br />

        {/* Content1  */}
        <div className="container" style={{ marginTop: '3%' }}>
          <div className="row">
            <div className="col-md-12 col-lg-6">
              <div className="container"><img src={image1} style={{ width: '75%' }} alt="" /></div>
            </div>
            <div className="col-md-12 col-lg-6">
              <div className="container" style={{ marginTop: '7%' }}>
                <div className="base_header"><span><small className="bor_header_left"></small>Todo sobre nosotros<small className="bor_header_right"></small></span>
                  <h3>JukumariTravels.com.</h3>
                </div>
                <div className="base_footer">
                  <p>Si estas pensando en viajar, planea tus vaciones con Jukumari Travels y no dejes de vivir una experiencia inolvidable al lado de tu pareja, amigos, o familiares. <br /><br />Deja todo en nuetras manos y dedicate a disfrutar y a que te atiendan como te lo mereces.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />



        {/* Content2  */}
        <div className="container" style={{ marginTop: '3%' }}>
          <div className="row">
            <div className="col-md-12 col-lg-6">
              <div className="container" style={{ marginTop: '7%' }}>
                <div className="base_header"><span><small className="bor_header_left"></small>Mision<small className="bor_header_right"></small></span>
                  <h3>Nuestra razón de ser</h3>
                </div>
                <div className="base_footer">
                  <p>JUKUMARI TRAVELS es una empresa líder en turismo que ofrece experiencias inolvidables a nivel local, nacional e internacional. Nos enfocamos en el ecoturismo y la conservación del medio ambiente, promoviendo buenas prácticas y concientizando sobre la importancia de cuidar la naturaleza. 
                  <br/>
                  Contamos con un talento humano capacitado y nos regimos por la responsabilidad social y empresarial para brindar un servicio de calidad.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6">
              <div className="container"><img src={image1} style={{ width: '75%' }} alt="" /></div>
            </div>

          </div>
        </div>
        <br />


        {/* Content3  */}
        <div className="container" style={{ marginTop: '3%' }}>
          <div className="row">
            <div className="col-md-12 col-lg-6">
              <div className="container"><img src={image1} style={{ width: '75%' }} alt="" /></div>
            </div>
            <div className="col-md-12 col-lg-6">
              <div className="container" style={{ marginTop: '7%' }}>
                <div className="base_header"><span><small className="bor_header_left"></small>VISION<small className="bor_header_right"></small></span>
                  <h3>Asi es nuestro camino y nuestras metas.</h3>
                </div>
                <div className="base_footer">
                  <p>Nuestra visión es convertirnos en una reconocida Agencia de Viajes regional, líder en turismo de aventuras. Nos destacamos por ofrecer confianza y seguridad a nuestros clientes, así como productos de alta calidad y lealtad. Nos enfocamos en presentar servicios innovadores y garantizar una actividad turística estable. Buscamos crear un ambiente de buenas relaciones tanto con nuestros clientes como con nuestro equipo de trabajo, con el objetivo de lograr la máxima satisfacción y beneficio para nuestros clientes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
      <div>
        <Link to="https://wa.me/573043635185?text=Necesito%20más%20información%20sobre%20planes%20turísticos.%20Mensaje%20automático%20desde%20la%20pagina%20Web" className="whatsapp" target="_blank"> <i className="fa fa-whatsapp whatsapp-icon"></i></Link>
      </div>

      <Footer />
    </div>
  )
}

export default Nosotros
