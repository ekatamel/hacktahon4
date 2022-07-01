import SearchFlights  from "./SearchFlights";
import PopularFlights from './PopularFlights';
import SearchBarDestination from './SearchBarDestination';
import SearchResultsDestination from './SearchResultsDestination';
import LocationDetail from './LocationDetail';
import FlightDetail from './FlightDetail';
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
          Search
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

        <Route path='/flight/:from/:to' element={<FlightDetail />} />

        <Route path='/locations/:code' element={<LocationDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
