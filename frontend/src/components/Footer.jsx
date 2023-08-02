import React from 'react'
import { Link, Route, Routes, useParams } from 'react-router-dom';
import listaDestinosTuristicos from '../view/ListaDestinosTuristicos';

const Footer2 = () => {
        const primerosDestinos = listaDestinosTuristicos.slice(0, 5);
    return (
        <div>
            <body>
                <footer className="text-white">
                    <div className="container py-4 py-lg-5">
                        <div className="row">
                            <div className="col-sm-6 col-md-4 item">
                                <h3 className="footer-links-title">Servicios</h3>
                                <hr />
                                <ul className="footer-links">
                                    <li><Link className="link-light" href="/about">What is HomieTouch</Link></li>
                                    <li><Link className="link-light" href="/#team">Our Team</Link></li>
                                    <li><Link className="link-light" href="/contact">Contact</Link></li>
                                    <li><Link className="link-light" href="/terms-privacy">Terms & Conditions</Link></li>
                                    <li><Link className="link-light" href="/terms-privacy">Privacy Policy</Link></li>
                                </ul>
                            </div>
                            <div className="col-sm-6 col-md-4 item">
                                <h3><strong>Destinos</strong></h3>
                                <hr />
                                <ul className="footer-links">
                                    <li><Link className="link-light">Banglore</Link></li>
                                </ul>
                                <ul>
                                    {primerosDestinos.map((destinos, index) => (
                                        <li key={index}>{destinos.destino}</li>
                                    ))}
                                </ul>
                                <Link to="/destinos" className="text-decoration-none text-white ">Ver más destinos</Link>




                            </div>
                            <div className="col-sm-6 col-md-4 item">
                                <h3><strong>Contactanos</strong></h3>
                                <hr />
                                <ul className="footer-links">
                                    <li><Link className="link-light"><i class="fa-solid fa-phone me-2"></i>+57 304 3635185</Link></li>
                                    <li><Link className="link-light"><i class="fa-solid fa-envelope me-2"></i>jukumaritravels@gmail.com</Link></li>
                                    <br />
                                    <br />
                                </ul>
                            </div>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between align-items-center pt-3">
                            <div className="container text-white py-4 py-lg-5">
                                <ul className="list-inline">
                                    <li className="list-inline-item me-4"><Link className="link-light" href="#">Una experiencia para vivir y nunca olvidar</Link></li>
                                </ul>
                                <ul className="list-inline">
                                    <li className="list-inline-item me-4">
                                        <Link to="https://www.facebook.com/profile.php?id=100085310961891&mibextid=ZbWKwL" className="link-light"><i className="fa-brands fa-facebook fa-2xl"></i></Link>
                                    </li>
                                    {/*<li className="list-inline-item me-4">
                                        <Link to="" className="link-light"><i className="fa-brands fa-twitter fa-2xl"></i></Link>
                                    </li>*/}
                                    <li className="list-inline-item me-4">
                                        <Link to="https://instagram.com/jukumaritravels?igshid=MzNlNGNkZWQ4Mg==" className="link-light"><i className="fa-brands fa-instagram fa-2xl"></i></Link>
                                    </li>
                                    <li className="list-inline-item">
                                        <Link to="https://www.tiktok.com/@jukumaritravels?_t=8dE4dmsl39a&_r=1" className="link-light"><i className="fa-brands fa-tiktok fa-2xl"></i></Link>
                                    </li>
                                </ul>
                                <p className="copyright">Jukumaritravels © 2023</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </body>
        </div >
    )
}

export default Footer2
