import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LocationMarker from './LocationMarker';

function App() {
  // eslint-disable-next-line no-unused-vars
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios
      .get('https://data.nantesmetropole.fr/api/records/1.0/search/', {
        params: {
          dataset: '244400404_defibrillateurs-nantes',
          rows: 1000,
        },
      })
      .then((response) => {
        //setRecords(response.data.records);
      });
  }, []);

  return (
    <div className='App'>
      <MapContainer
        center={[47.2184, -1.5536]}
        zoom={12}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <LocationMarker />
        {records.map((defibrillateur) => {
          const { coordinates } = defibrillateur.fields.geo_shape;
          return (
            <Marker
              key={defibrillateur.recordid}
              position={[coordinates[1], coordinates[0]]}
            >
              <Popup>{defibrillateur.fields.adresse}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default App;
