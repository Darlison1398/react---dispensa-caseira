import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div>
      <header className="container">
        <div className="text-center">
          <h1 className="text-center">Dispensa Caseira</h1>
        </div>
        <div className="text-center">
          <ul className="nav d-flex justify-content-center">
            <li className="nav-item">
              <Link to="/main/listaProdutos" className="nav-link">Meus produtos</Link>
            </li>
            <li className="nav-item">
              <Link to="/main/cadastro" className='nav-link'> Cadastrar produto</Link>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default Header;
