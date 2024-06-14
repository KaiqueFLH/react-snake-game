// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChoicePers from './choicePers/ChoicePers';
import Game from './game/Game';
import PersProvider from './contexts/persProvider';

const AppRoutes = () => {
  return (
    <PersProvider>
    <Router>
      <Routes>
        <Route path="/" element={<ChoicePers/>} />
        <Route path="/game" element={<Game/>} />
      </Routes>
    </Router>
    </PersProvider>
  );
};

export default AppRoutes;