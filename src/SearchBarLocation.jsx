import { useState, useEffect } from 'react';
import SearchResultsLocation from './SearchResultsLocation';

const SearchBarDestination = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const url = `https://api.skypicker.com/locations?term=${query}&location_types=airport&location_types=station&location_types=city&location_types=country&location_types=region&limit=50&active_only=true&sort=rank`;

  //   `https://api.skypicker.com/flights?fly_from=${queryFrom}&fly_to=${queryTo}&limit=10&partner=data4youcbp202106`;

  const getData = async () => {
    const response = await fetch(url);
    const results = await response.json();

    console.log(results.locations);
    setResults(results.locations);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='search__locations_main'>
      <div className='search__locations_container'>
        <h2 className='search__title'>Search for a location!</h2>
        <div className='search__input-container'>
          <input
            className='search__locations_inputs'
            type='queryFrom'
            onChange={(e) => {
              getData();
              setQuery(e.target.value);
            }}
          />
          <button
            className='search__locations_button'
            // onClick={() => {
            //   getData();
            // }}
          >
            Search for Location
          </button>
          {query && <SearchResultsLocation results={results} />}
        </div>
      </div>
    </div>
  );
};

export default SearchBarDestination;
