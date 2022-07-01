import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const LocationDetail = () => {
  const [location, setLocation] = useState([]);
  const params = useParams();
  //   console.log(params);
  const url = `https://api.skypicker.com/locations?term=${params.code}&location_types=airport&location_types=station&location_types=city&location_types=country&location_types=region&limit=5&active_only=true&sort=rank`;

  const getData = async () => {
    const response = await fetch(url);
    const locationData = await response.json();

    console.log(locationData.locations[0]);

    setLocation(locationData.locations[0]);
  };

  useEffect(() => {
    getData();
  }, [url]);

  //   console.log(location);

  return (
    <div>
      {location && (
        <div className='location__detail'>
          <h2>{location.name}</h2>
          <div className='location__detail-info'>
            <p>Population: {location.population}</p>
            <p>Number of hotels: {location.hotels}</p>
          </div>
        </div>
      )}
      <button>
        <Link style={{ textDecoration: 'none' }} to='/search-main'>
          Go back to search
        </Link>
      </button>
    </div>
  );
};

export default LocationDetail;
