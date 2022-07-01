import PopularFlights from './PopularFlights';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <PopularFlights />
      </div>
    </BrowserRouter>
  );
}

export default App;
