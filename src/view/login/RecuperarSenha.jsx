import React, { useState } from "react";
import TextInput from "../components/TextInput";
import { Link } from "react-router-dom";

function RecuperarSenha() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const st = {
        width: "70%",
        margin: "auto"
    };

    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validar o e-mail
        if (!email) {
            setError("Por favor, digite seu e-mail.");
            return;
        }

        fetch('http://localhost:8282/auth/request-password-reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Não foi possível enviar a solicitação de recuperação de senha.');
            }
            return response.json();
        })
        .then(data => {
            setMessage('Um e-mail foi enviado com instruções para recuperar sua senha.');
            setError('');
            console.log('Sucesso:', data);
        })
        .catch((error) => {
            setError('Não foi possível enviar a solicitação de recuperação de senha.');
            setMessage('');
            console.error('Erro:', error);
        });
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Recuperar Senha</h2>
            <div className="container d-flex justify-content-end mt-3">
                <Link to="/" className="btn btn-primary ml-3">Voltar</Link>
            </div>

            <div className="d-flex justify-content-center mt-4">
                <form onSubmit={handleSubmit} className="d-flex justify-content-center" style={st}>
                    <div className="col-sm-8">
                        <TextInput
                            label="Digite o seu e-mail"
                            type="email"
                            placeholder="Digite seu e-mail"
                            value={email}
                            onChange={handleChange}
                            className="w-100"
                        />
                    </div>
                    <div className="container d-flex justify-content-center align-items-center">
                        <button type="submit" className="btn btn-warning">Recuperar Senha</button>
                    </div>
                </form>
            </div>

            {message && (
                <div className="container mt-4" style={st}>
                    <h4>{message}</h4>
                    <ol>
                        <li>Você receberá um e-mail com instruções para recuperar sua senha.</li>
                        <li>Siga as instruções do e-mail para recuperar sua senha.</li>
                    </ol>
                </div>
            )}

            {error && (
                <div className="alert alert-danger mt-4" role="alert" style={st}>
                    {error}
                </div>
            )}
        </div>
    );
}

export default RecuperarSenha;
