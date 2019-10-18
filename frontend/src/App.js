import React from 'react';
import './App.css';
import logo from './assets/logo.svg'

///Parou na hora 32 Minutos na Video Aula


function App() {
  return (
    <div className="container">
      <img src={logo} alt="AirCnC"/>
    <div className="content">
      <p>Ofereça <strong>Spots</strong> para <strong>programadores</strong> e enconte talentos para sua empresa</p>
      <form>
        <label htmlFor="email">E-MAIL *</label>
        <input 
        id="email" 
        type="email" 
        placeholder="Seu melhor email"
        />
        <button className="btn" type="submit">Entrar</button>
      </form>
    </div>
    </div>
  );
}

export default App;
