import React from 'react'

import Home from '../dashoboard/view/Home'
import Destinos from '../dashoboard/view/Destinos'
import Cliente from '../dashoboard/view/Cliente'
import Proveedores from '../dashoboard/view/Proveedores'
import Paquetes from '../dashoboard/view/Paquetes'
import Reserva from '../dashoboard/view/Reserva'
import NavbarDashboard from '../dashoboard/components/NavbarDashboard'
import { Route, Routes } from 'react-router'

const Aplication = () => {
  return (
    <div>
        <NavbarDashboard/>  
        <Routes>
      
            <Route path='/' element={<Home/>}/>
            <Route path='destinos' element={<Destinos/>}/>
            <Route path='cliente' element={<Cliente/>}/>
            <Route path='proveedores' element={<Proveedores/>}/>
            <Route path='paquetes' element={<Paquetes/>}/>
            <Route path='reserva' element={<Reserva/>}/>
        </Routes>
        
    </div>
  )
}

export default Aplication