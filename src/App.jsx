import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MovieDetails from './components/MovieDetails/MovieDetails';
import { useState } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className='app'>
      <Router>
        <Header setIsLoading={setIsLoading} />
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home isLoading ={isLoading} />} />
            <Route path='/movie/:imdbID' element={<MovieDetails />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
