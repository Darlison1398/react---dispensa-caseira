import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

function Perfil() {
    const [id, setId] = useState(''); 
    const [nome, setNome] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch('http://localhost:8282/auth/me', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    
                    //console.log("Fetched user data:", data);

                    setId(data.id); // Definir o ID do usuário
                    setNome(data.nome);
                    setLastname(data.lastname);
                    setEmail(data.email);
                } else {
                    console.error('Erro ao carregar dados do usuário:', response.statusText);
                }
            } catch (error) {
                console.error('Erro ao carregar dados do usuário:', error);
            }
        }

        fetchUser();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'nome') setNome(value);
        if (name === 'lastname') setLastname(value);
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {

            //console.log("Atualizando usuário com ID:", id);

            const response = await fetch(`http://localhost:8282/auth/updateUser/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify({ nome, lastname, email, password })
            });

            if (response.ok) {
                alert('Informações do perfil atualizadas com sucesso.');
                navigate('/main');
            } else {
                alert('Erro ao atualizar informações do perfil.');
            }
        } catch (error) {
            console.error('Erro ao atualizar informações do perfil:', error);
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div>
                <h3>Informações sobre o seu perfil</h3>
                <hr />
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formNome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            name="nome"
                            value={nome}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formLastname">
                        <Form.Label>Sobrenome</Form.Label>
                        <Form.Control
                            type="text"
                            name="lastname"
                            value={lastname}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-3">
                        Salvar alterações
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Perfil;
