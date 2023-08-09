import "./assets/css/index.css";
import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './view/Home'
import Nosotros from './view/Nosotros'
import DestinosTuristicos from "./view/DestinosTuristicos";
import Login from "./view/Login"
import Aplication from './dashoboard/Aplication'


function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="nosotros" element={<Nosotros/>} />
        <Route path="destinos" element={<DestinosTuristicos/>} />
        <Route path="login" element={<Login/>} />
        <Route exact path="/aplication/*" element={<Aplication/>} />
        <Route path="*" element={<h1>Not found - No insista tienes una pagina que no existe</h1>} />
      </Routes>

    </div>
  );
}

export default App;
