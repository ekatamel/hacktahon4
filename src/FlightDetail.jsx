import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DateTime } from 'luxon';

const LocationDetail = ({ flight }) => {
  const [flightInfo, setFlightInfo] = useState([]);
  const params = useParams();
  //   console.log(flight);

  const url = `https://api.skypicker.com/flights?fly_from=PRG&partner=data4youcbp202106&term=${params.id}&limit=15&sort=date`;

  const getData = async () => {
    const response = await fetch(url);
    const flightData = await response.json();

    console.log(flightData.data[0]);

    setFlightInfo(flightData.data[0]);
  };

  useEffect(() => {
    flightInfo && getData();
  }, [url]);

  //   console.log(location);

  return (
    <div>
      {flightInfo && (
        <div className='flight__detail'>
          <h2>
            {flightInfo.cityFrom} to {flightInfo.cityTo}
          </h2>
          <div className='flight__detail-info'>
            <p className='flight__date'>
              {' '}
              <strong>Date:</strong>{' '}
              {DateTime.fromMillis(flightInfo.aTime * 1000).toFormat(
                'dd LLL yyyy'
              )}
            </p>
            <p>
              <strong>Departure:</strong>
              {DateTime.fromMillis(flightInfo.dTime * 1000).toFormat('hh:mm')}
            </p>
            <p>
              <strong>Arrival:</strong>{' '}
              {DateTime.fromMillis(flightInfo.aTime * 1000).toFormat('hh:mm')}
            </p>
            <p>
              <strong>Price:</strong> {flightInfo.price} €
            </p>
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
