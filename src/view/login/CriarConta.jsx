import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TextInput from '../components/TextInput';

function CriarConta() {
    const [nome, setNome] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleNomeChange = (e) => {
        setNome(e.target.value);
    };

    const handleLastnameChange = (e) => {
        setLastname(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = "http://localhost:8282/auth/criarConta";

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                lastname: lastname,
                email: email,
                password: password
            })
        })
        .then(response => {
            if (response.ok) {
                alert("Conta criada com sucesso!");
                setNome('');
                setLastname('');
                setEmail('');
                setPassword('');
                
                window.location.href = '/';
            } else {
                throw new Error('Erro ao criar a conta.');
            }
        })
        .catch(error => {
            console.error('Erro ao criar conta:', error);
            setError('Erro ao criar a conta. Verifique os dados e tente novamente.');
        });
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="container-center-center">
                <div className="container">
                    <h3 className="text-center">Criar conta</h3>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form className="mt-3" onSubmit={handleSubmit}>
                        <TextInput
                            label="Nome"
                            type="text"
                            placeholder="Digite seu nome..."
                            value={nome}
                            onChange={handleNomeChange}
                        />
                        <TextInput
                            label="Sobrenome"
                            type="text"
                            placeholder="Sobrenome..."
                            value={lastname}
                            onChange={handleLastnameChange}
                        />
                        <TextInput
                            label="Email"
                            type="email"
                            placeholder="Email..."
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <TextInput
                            label="Senha"
                            type="password"
                            placeholder="Senha..."
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <button type="submit" className="btn btn-primary btn-block">Criar conta</button>
                    </form>
                </div>
                
                <div className="container d-flex justify-content-center mt-4" >
                    <div className="text-center">
                        <span>Já tem conta?</span><br />
                        <Link to="/">Fazer login</Link>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default CriarConta;
