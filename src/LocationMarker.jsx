import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { useState, useEffect } from 'react';

function LocationMarker() {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
    },
  });

  useEffect(() => {
    function locate() {
      map.locate();
    }

    const interval = setInterval(locate, 3000);

    return () => clearInterval(interval);
  }, [map]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

export default LocationMarker;
