import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';
import departures from './departures.png';
import landing from './landing.png';
import calendar from './calendar.png';
import directFlight from './direct-flight.png';

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
      <h1 className='flights__headline'>The most popular flights.</h1>
      <h2 className='flights__subheadline'>Book now!</h2>
      <div className='flights__list'>
        {flights.map((flight) => {
          return (
            <div key={flight.id} className='flight'>
              <div className='flight__main'>
                <p className='flight__title'>
                  {' '}
                  <strong>{flight.cityFrom}</strong> to{' '}
                  <strong>{flight.cityTo}</strong>
                </p>
              </div>
              <div className='flight__info'>
                {flight.routes.length > 1 ? (
                  <p>Number of Transfers: {flight.routes.length}</p>
                ) : (
                  <p>
                    <img className='flight__logo' src={directFlight} alt='' />
                    Direct flight
                  </p>
                )}
                <p className='flight__date flight__text'>
                  <img className='flight__logo' src={calendar} alt='' />
                  {DateTime.fromMillis(flight.aTime * 1000).toFormat(
                    'dd LLL yyyy'
                  )}
                </p>
              </div>

              <div className='flight__times'>
                <p>
                  <img className='flight__logo' src={departures} alt='' />
                  {DateTime.fromMillis(flight.dTime * 1000).toFormat('hh:mm')}
                </p>

                <p>
                  <img className='flight__logo' src={landing} alt='' />
                  {/* Arrival:{' '} */}
                  {DateTime.fromMillis(flight.aTime * 1000).toFormat('hh:mm')}
                </p>
              </div>
              <button className='flight__button'>
                <Link className='flight__button--link' to={`/flight/${flight.cityFrom}/${flight.id}`}>
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
