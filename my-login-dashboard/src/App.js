import React from 'react';
import './App.css';
import { BrowserRouter as Router,Route,Routes,Navigate } from 'react-router-dom';
import Login from './components/Login'
import Dashboard from './components/Dashboard'


function App() {
  const isAuth=localStorage.getItem('auth') && true;  
  debugger

  return (
    <div className="app-container">
    
     <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={isAuth ? <Dashboard />:<Navigate to="/" />} />
        <Route/>
      </Routes>
     </Router>   
     </div>
  );
}

export default App;
