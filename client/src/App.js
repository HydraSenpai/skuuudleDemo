import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

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
    <Router>
      <Routes>
        <Route path='/' element={<Home properties={properties} />} />
      </Routes>
    </Router>
  );
}

export default App;
