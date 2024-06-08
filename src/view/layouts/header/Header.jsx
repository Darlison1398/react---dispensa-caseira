import React from 'react';
import { Link } from 'react-router-dom';

function Header() {

  return (
    <div className='container-geral'>
      <header className="container">
        <h1 className="text-center">Dispensa Caseira</h1>
        
        <div className="text-center">
          <ul className="nav d-flex justify-content-center">
            <li className="nav-item">
              <Link to="/main/listaProdutos" className="nav-link">Meus produtos</Link>
            </li>
            <li className="nav-item">
              <Link to="/main/cadastro" className='nav-link'> Cadastrar produto</Link>
            </li>
            <li className="nav-item">
              <Link to="/main/perfil" className='nav-link'>Perfil</Link>
            </li>
            <li className="nav-item">
              <Link to="/" className='nav-link'>Sair</Link>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default Header;
