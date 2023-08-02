import React from 'react'
import Logo from '../Images/Logo.png'


const Home = () => {
  return (
    <div className="container-lg mt-4">
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card">
            <img src={Logo} className="card-img-top" alt="..." style={{ width: '100%', height: '150px' }} />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <img src={Logo} className="card-img-top" alt="..." style={{ width: '100%', height: '150px' }} />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <img src={Logo} className="card-img-top" alt="..." style={{ width: '100%', height: '150px' }} />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
        
      </div>
    </div>


  )
}

export default Home