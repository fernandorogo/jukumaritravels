import cancun from '../image/planes/cancun.jpg';
import capurgana from '../image/planes/capurgana.jpg';
import arboletes from '../image/planes/arboletesplaya.jpg';
import quindio from '../image/planes/quindio.jpg';
import santamarta from '../image/planes/santamarta.jpg';
import islafuerte from '../image/planes/islafuerte.jpg';
import llanosorientales from '../image/planes/llanosorientales.jpg';
import sanandresisla from '../image/planes/sanandresisla.jpg';
import nuqui from '../image/planes/nuqui.jpg';
import boyaca from '../image/planes/boyaca.jpg';
import guatape from '../image/planes/guatape.jpg';
import sanrafael from '../image/planes/sanrafael.jpg';
import sancarlos from '../image/planes/sancarlos.jpg';
import haciendanapoles from '../image/planes/haciendanapoles.jpg';
import santafedeantioquia from '../image/planes/santafedeantioquia.jpeg';
import jardin from '../image/planes/jardin.jpg';
import cocorna from '../image/planes/cocorna.jpg';
import rioclaro from '../image/planes/rioclaro.jpg';
import santorinidoradal from '../image/planes/santorinidoradal.jpg';
import riomelcocho from '../image/planes/riomelcocho.jpg';
import puntacana from '../image/planes/puntacana.jpg';
import cuba from '../image/planes/cuba.jpg';
import tolucovenas from '../image/planes/tolucovenas.jpg';


const listaDestinosTuristicos = [
  {
    destino: 'Capurganá,  Colombia',
    lema: 'Donde la selva y el mar se abrazan en un paraíso único.',
    imagen: capurgana,
    resena: 'Destino turístico colombiano, ofrece una selva virgen, aguas cristalinas, playas limpias y una exuberante vegetación. Su paisaje impresionante y la armonía con la naturaleza te cautivarán. ¡Descubre la maravilla de Capurganá!'
  },
  {
    destino: 'Arboletes, Colombia',
    lema: 'Cuando el paraíso se encuentra con el mar, nace la magia de Arboletes.',
    imagen: arboletes,
    resena: 'Descubre la maravilla de Arboletes, un impresionante destino turístico. Sus playas de aguas cristalinas y exuberante vegetación te dejarán sin palabras. Sumérgete en su entorno natural y disfruta de la armonía con la naturaleza.'
  },
  {
    destino: 'Quindío, Colombia',
    lema: 'Donde los sueños florecen entre cafetales y paisajes de ensueño.',
    imagen: quindio,
    resena: 'Descubre el encanto del Quindío, un destino cautivador. Sus paisajes, cultura cafetera y clima agradable te sorprenderán. Explora sus coloridos cafetales, vive la experiencia del turismo rural y maravíllate con sus hermosos parques naturales.' 
  },
  {
    destino: 'Santa Marta, Colombia',
    lema: 'Descubre la joya caribeña donde sol, playa e historia se fusionan en un paraíso sin igual.',
    imagen: santamarta,
    resena:'Santa Marta, en la costa caribeña de Colombia, es una joya que combina playas paradisíacas, historia encantadora y naturaleza exuberante. ¡Sumérgete en su magia caribeña y descubre la armonía perfecta entre sol, mar y cultura!'
  },
  {
    destino: 'Tolú Coveñas, Colombia',
    lema: '¡Vive momentos inolvidables en este rincón vibrante de la costa caribeña.',
    imagen: tolucovenas,
    resena: 'En la costa caribeña de Colombia, es un destino paradisíaco con playas de ensueño, sol radiante y una rica cultura costeña. Disfruta del mar turquesa, la arena blanca y sumérgete en la belleza natural de la Reserva Natural Sanguaré.' 
  },
  
  {
    destino: 'Isla Fuerte, Colombia',
    lema: 'Donde la naturaleza cobra vida en un oasis caribeño.',
    imagen: islafuerte,
    resena: 'Un paraíso natural de ensueño. Sus aguas cristalinas y paisajes exuberantes te envuelven en una experiencia única. Sumérgete en su rica biodiversidad marina, explora sus senderos y disfruta de la tranquilidad de este remanso caribeño.'
  },
  {
    destino: 'Llanos Orientales, Colombia',
    lema: 'Donde la naturaleza y la cultura se funden en una sinfonía de vida.',
    imagen: llanosorientales,
    resena: 'Un vasto y cautivador territorio, te sumergiran en su naturaleza y la autenticidad de la cultura llanera. En este escenario, se crea un paisaje impresionante. Vive la experiencia de los Llanos Orientales y déjate envolver por su encanto único.',
  },
  {
    destino:'San Andres Islas, Colombia',
    lema: 'Donde el paraíso cobra vida en aguas turquesas y arenas blancas.',
    imagen: sanandresisla,
    resena: 'Un paraíso tropical en el Caribe. Sus playas de aguas turquesas y arenas blancas te cautivarán. Sumérgete en su rica vida marina y descubre su cultura caribeña única. ¡Disfruta de sol, mar y diversión en San Andrés Isla!',
  },
  {
    destino:'Nuquí, Colombia',
    lema: 'Donde la selva se encuentra con el océano en un abrazo mágico.',
    imagen: nuqui,
    resena: 'Un tesoro en la costa pacífica de Colombia. Playas vírgenes, selva exuberante y una cultura afrocolombiana vibrante. Disfruta de ballenas, manglares y la tranquilidad de este paraíso natural. ¡Sumérgete en la magia de Nuquí!',
  },
  {
    destino: 'Boyacá, Colombia',
    lema: 'Donde la historia se entrelaza en paisajes encantadores.',
    imagen: boyaca,
    resena: 'Boyacá, historia y belleza en paisajes encantadores. Descubre su riqueza cultural, pueblos coloniales y montañas verdes. Sumérgete en la autenticidad de esta región llena de historia y encanto. Disfruta de la hospitalidad de su gente.',
  },
  {
    destino: 'Guatapé, Colombia',
    lema: 'La naturaleza cobra vida en un vibrante lienzo de color e historia.',
    imagen: guatape,
    resena: 'Aquí, la naturaleza, el color y la historia se fusionan en perfecta armonía. Sus paisajes pintorescos, adornados con vivas fachadas y zócalos decorados, te transportan a un mundo de encanto y alegría. Sumérgete en la tranquilidad de su entorno natural. ',
  },
  {
    destino: 'San Rafael, Colombia',
    lema: 'Paraíso natural de cascadas y aventuras sin límites',
    imagen: sanrafael,
    resena: 'La famosa Cascada del Toro te maravillará con su belleza y sus refrescartes aguas cristalinas. San Rafael ofrece un entorno rodeado de exuberante vegetación y paisajes montañosos, ideales para  actividades al aire libre.',
  },
  {
    destino: 'San Carlos, Colombia',
    lema: 'Donde la naturaleza y la tranquilidad se abrazan en perfecta armonía.',
    imagen: sancarlos,
    resena: 'San Carlos, un rincón encantador en Antioquia, Colombia, te invita a sumergirte en un remanso de tranquilidad y naturaleza. Este destino te brinda la oportunidad de desconectar y reconectarte con la serenidad de la naturaleza.'
  },
  {
    destino: 'Hacienda Napoles, Colombia',
    lema: 'Aquí, la historia se fusiona con la naturaleza en un paraíso cautivador.',
    imagen: haciendanapoles,
    resena: 'Es un destino único que combina historia y naturaleza de manera excepcional. La hacienda ha sido transformada en un parque temático y reserva natural. Descubre una amplia variedad de animales exóticos, y hermosos paisajes. ',
  },
  {
    destino: 'Santa Fe de Antioquia, Colombia',
    lema: 'Donde el encanto colonial se mezcla con la calidez de su gente',
    imagen: santafedeantioquia,
    resena: 'Santa Fe de Antioquia, te transporta a épocas pasadas. Sus calles empedradas y su encanto colonial te invitan a perderse en su rica historia. Visita su majestuosa catedral y admira la arquitectura colonial que se conserva en cada rincón.',
  },
  {
    destino: 'Jardin, Colombia',
    lema: 'Donde la naturaleza florece y los sueños se hacen realidad.',
    imagen: jardin,
    resena: 'Relájate junto a ríos y cascadas cristalinas, y maravíllate con la diversidad de flora y fauna que habita en la región. Jardines es el lugar perfecto para desconectar, conectarte con la naturaleza y dejarte llevar por su magia. Déjate cautivar por su encanto natural.',
  },
  {
    destino: 'Cocorná, Colombia',
    lema: 'La naturaleza se revela en su máximo esplendor.',
    imagen: cocorna,
    resena:'Rodeado de montañas imponentes y paisajes exuberantes, Ven a sumergirte en un paraíso natural. Disfruta de la belleza de sus ríos cristalinos, cascadas impresionantes y senderos escénicos que te llevan a descubrir la abundante flora y fauna de la región',
  },
  {
    destino: 'Rio Melcocho, Colombia',
    lema: 'La serenidad fluye entre paisajes cautivadores',
    imagen: riomelcocho,
    resena:'El río Melcocho, un tesoro natural en Colombia, su entorno natural invita a los amantes de la naturaleza a explorar y descubrir su belleza escondida. Sumérgete en la tranquilidad y la maravilla de este río, donde cada visita te brinda una experiencia única y enriquecedora.',
  },
  {
    destino: 'Rio Claro, Colombia',
    lema: 'La naturaleza se despliega en toda su majestuosidad',
    imagen: rioclaro,
    resena:' Explora sus senderos rodeados de densa vegetación, admira las imponentes formaciones rocosas y relájate en sus refrescantes piscinas naturales. Además, puedes disfrutar de emocionantes actividades como el canopy y el tubing.',
  },
  {
    destino: 'Santorini, Colombia',
    lema: 'La magia mediterránea se encuentra con la belleza colombiana',
    imagen: santorinidoradal,
    resena: 'Es un lugar mágico ubicado en Antioquia, Colombia. Con sus casas blancas y detalles azules, este destino te transporta a un ambiente sereno que combina la esencia del Mediterráneo con la calidez de Antioquia. "Un destino para no olvidar".',
  },
  {
    destino: 'Punta Cana, República Dominicana',
    lema:' El paraíso se hace realidad en playas de ensueño',
    imagen: puntacana,
    resena:'Punta Cana ofrece una amplia gama de actividades acuáticas, como buceo, snorkel y paseos en catamarán. También podrás explorar la belleza natural de la región, visitar parques ecológicos y descubrir la vibrante vida nocturna.',
  },
  {
    destino: 'Cancun, Mexico',
    lema: 'El Caribe cobra vida en un destino de ensueño.',
    imagen: cancun,
    resena:'Es un destino de renombre mundial que combina playas de arena blanca y aguas turquesas y una rica cultura. Sus playas son perfectas para relajarse y disfrutar del sol caribeño. Cancún cumple todos los sueños de vacaciones tropicales',
  },
  {
    destino: 'La Habana, Cuba',
    lema: 'La historia, la música y la pasión se entrelazan en una isla inolvidable',
    imagen: cuba,
    resena: 'Cuba, una joya en el Caribe, es un destino lleno de encanto y autenticidad. Con su rica historia, vibrante cultura y paisajes impresionantes, Cuba ofrece una experiencia única. Desde las calles coloridas de La Habana hasta las playas de Varadero.',
  },
  
];

export default listaDestinosTuristicos;