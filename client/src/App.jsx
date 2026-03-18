import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/DashboardPage';
import Expenses from './pages/ExpensesPage';
import Subscriptions from './pages/SubscriptionsPage';
import Statistics from './pages/StatisticsPage';
import UpdatePage from './pages/UpdatePage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/expenses' element={<Expenses />} />
        <Route path='/subscriptions' element={<Subscriptions />} />
        <Route path='/statistics' element={<Statistics />} />
        <Route path='/update' element={<UpdatePage />} />
      </Routes>
    </Router>
  );
}

export default App;
