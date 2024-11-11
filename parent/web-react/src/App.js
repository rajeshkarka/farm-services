import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from './pages/homePage';

const App = () => {
  return (
    <Router>
      <HomePage />
      {/* You can add more Routes here */}
    </Router>
  );
};

export default App;


