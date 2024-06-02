import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TextInput from '../components/TextInput';
import axios from 'axios';
import { useAuth } from '../layouts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Flash from '../components/Flash';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8282/auth/login", {
        email: email,
        password: password
      });

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('authToken', token);
        login();
        console.log(token);
        navigate('/main');
      }

    } catch (error) {
      setError('Erro ao tentar fazer login!');
      setEmail('');
      setPassword('');
      console.log(error);

      // Limpar o erro após 5 segundos
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">

      <div className="container-center-center">
      <Flash type="error" message={error} setMessage={setError} />
        <div className="container">
          <h3 className="text-center">Login</h3>
          <form className="mt-3" onSubmit={handleSubmit}>
            <TextInput
              label="Email address"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
            />
            <TextInput
              label="Password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
            />
            <button type="submit" className="btn btn-primary btn-block">Login</button>
          </form>
        </div>

        <div className="container d-flex justify-content-center mt-5">
          <div className="col-sm-6">
            <span>Ainda não tem conta?</span><br />
            <Link to="/criarConta">Criar conta</Link>
          </div>
          <div className="col-sm-6">
            <span>Esqueceu a senha?</span><br />
            <Link to="/">Recuperar senha</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
