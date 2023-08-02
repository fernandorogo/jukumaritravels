import React from 'react';

function MapContainer() {
  return (

    <div style={{ position: 'relative', overflow: 'hidden', paddingTop: '70%' }}>
      <iframe
        title="Google Maps"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d990.7499388152854!2d-75.46058993049034!3d6.646949931674861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e44456bef4fe3ef%3A0xa7b2dfc403229bf0!2sJukumari%20Travels!5e0!3m2!1ses!2sco!4v1687918145935!5m2!1ses!2sco"
        width="100%"
        height="100%"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>


  );
}

export default MapContainer;
