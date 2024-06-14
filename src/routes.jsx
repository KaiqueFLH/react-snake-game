// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChoicePers from './choicePers/ChoicePers';
import Game from './game/Game';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChoicePers/>} />
        <Route path="/" element={<Game/>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;