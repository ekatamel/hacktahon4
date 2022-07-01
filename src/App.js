import SearchFlights  from "./SearchFlights";
import PopularFlights from './PopularFlights';
import SearchBarDestination from './SearchBarDestination';
import SearchResultsDestination from './SearchResultsDestination';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';





function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to='/' className='nav__link'>
          Home
        </Link>
        <Link to='/search-main' className='nav__link'>
          Search locations
        </Link>
        <Link to='/search-flights' className='nav__link'>
          Search flights
        </Link>
      </nav>
      {/* home page Route */}
      <Routes>
        <Route path='/' element={<PopularFlights />} />
        <Route path="/search-flights" element={<SearchFlights/>}/>
      </Routes>

      {/* search from Prague to any destination Route */}
      <Routes>
        <Route path='/search-main' element={<SearchBarDestination />} />

        <Route
          path='/search-main/:from'
          element={<SearchResultsDestination />}
        />

        {/* search results from Prague to any destination Route */}
        <Route
          path='/search-main/:from'
          element={<SearchResultsDestination />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
