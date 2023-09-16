import React from 'react'

import Cliente from '../dashoboard/view/Cliente'
import Destinos from '../dashoboard/view/Destinos'
import Home from '../dashoboard/view/Home'
import Proveedores from '../dashoboard/view/Proveedores'

import { Route, Routes } from 'react-router'
import NavbarDashboard from '../dashoboard/components/NavbarDashboard'
import Reservas from '../dashoboard/view/Reservas'

const Aplication = () => {
  return (
    <div>
        <NavbarDashboard/>  
        <Routes>
      
            <Route path='/' element={<Home/>}/>
            <Route path='destinos' element={<Destinos/>}/>
            <Route path='cliente' element={<Cliente/>}/>
            <Route path='proveedores' element={<Proveedores/>}/>
      
            <Route path='reservas' element={<Reservas/>}/>
        </Routes>
        
    </div>
  )
}

export default Aplication