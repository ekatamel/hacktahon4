import { Link } from 'react-router-dom';

const SearchResultsDestination = ({ results }) => {
  return (
    results && (
      <div className='search__whisper'>
        {results.map((result, i) => {
          return (
            <Link to={`/locations/${result.code}`} key={i}>
              <p>{result.name}</p>
            </Link>
          );
        })}
      </div>
    )
  );
};

export default SearchResultsDestination;
