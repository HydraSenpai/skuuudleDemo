import Home from './pages/Home';
import Data from './pages/Data';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Scrape from './pages/Scrape';

function App() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/').then((response) =>
      response
        .json()
        .then((data) => {
          setProperties(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        })
    );
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path='/'
            element={<Home properties={properties} loading={loading} />}
          />
          <Route
            path='/data'
            element={<Data properties={properties} loading={loading} />}
          />
          <Route
            path='/scrape'
            element={
              <Scrape
                properties={properties}
                loading={loading}
                setLoading={setLoading}
                setProperties={setProperties}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
