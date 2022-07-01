const SearchResultsDestination = ({ results }) => {
  return (
    results && (
      <div className='search__whisper'>
        {results.map((result, i) => {
          return <p key={i}>{result.id}</p>;
        })}
      </div>
    )
  );
};

export default SearchResultsDestination;
