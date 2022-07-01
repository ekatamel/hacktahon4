import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';

const PopularFlights = () => {
  const [flights, setFlights] = useState([]);
  const [offset, setOffset] = useState(0);

  const url = `https://api.skypicker.com/flights?fly_from=PRG&partner=data4youcbp202106&limit=15&sort=date&sroffset=${offset}`;

  const getData = async () => {
    const response = await fetch(url);
    const popularFlightsData = await response.json();

    // console.log(popularFlightsData);
    setFlights(popularFlightsData.data);
  };

  useEffect(() => {
    getData();
  }, [offset]);

  return (
    <div className='flights__main'>
      <div className='flights__list'>
        {flights.map((flight) => {
          return (
            <div key={flight.id} className='flight'>
              <div className='flight__main'>
                <strong>{flight.cityFrom}</strong> to{' '}
                <strong>{flight.cityTo}</strong>
                {flight.routes.length > 1 ? (
                  <p>Number of Transfers: {flight.routes.length}</p>
                ) : (
                  <p>Direct flight</p>
                )}
              </div>
              <p className='flight__date'>
                {' '}
                {DateTime.fromMillis(flight.aTime * 1000).toFormat(
                  'dd LLL yyyy'
                )}
              </p>
              <div className='flight__times'>
                <p>
                  Departure:
                  {DateTime.fromMillis(flight.dTime * 1000).toFormat('hh:mm')}
                </p>
                <p>
                  Arrival:{' '}
                  {DateTime.fromMillis(flight.aTime * 1000).toFormat('hh:mm')}
                </p>
              </div>
              <button>
                <Link to={`/flight/${flight.cityFrom}/${flight.id}`}>
                  See More Info
                </Link>
              </button>
            </div>
          );
        })}
      </div>
      <button disabled={offset === 0} onClick={() => setOffset(offset - 10)}>
        Previews 10 flights
      </button>
      <button onClick={() => setOffset(offset + 10)}>Next 10 flights</button>
    </div>
  );
};

export default PopularFlights;
