const [destinos, setDestinos] = useState([]);
const [selectedDestino, setSelectedDestino] = useState("");
const [destinoNombres, setDestinoNombres] = useState({});
// Función para obtener la lista de destinos desde el servidor
const obtenerDestinos = async () => {
  try {
    const response = await axios.get("/api/destinos/listall");
    console.log("Lista de destinos:", response);
    const destinosData = response.data.destinos;
    setDestinos(destinosData);
    // Crear un mapeo de _id a nombres
    const nombres = {};
    destinosData.forEach((destino) => {
      nombres[destino._id] = destino.nombreDestino;
    });
    setDestinoNombres(nombres);
  } catch (error) {
    console.error("Error al obtener la lista de destinos:", error);
  }
};

//Función para manejar el cambio de destino
const handleDestinoChange = (destinosId) => {
  setSelectedDestino(destinosId);
};*/ }