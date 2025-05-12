// employee/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/App.css';

import Dashboard from './Pages/Dashboard/Dashboard';
import LearnPage from './Pages/Learn/learnpage';
import TaskPage from './Pages/Tasks/Tasks';
import Teame from './Pages/Teame/Teame';

function App() {
  return (
    <div className="Main">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="learn" element={<LearnPage />} />
        <Route path="tasks" element={<TaskPage />} />
        <Route path="team" element={<Teame />} />
      </Routes>
    </div>
  );
}

export default App;
