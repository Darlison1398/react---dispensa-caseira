import React, { useState } from "react";
import TextInput from "../components/TextInput";
import { Link } from "react-router-dom";

function RecuperarSenha() {

    const st = {
        width: "70%",
        margin: "auto"
    }

    
    const [email, setEmail] = useState("");

    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("E-mail para recuperação de senha:", email);
        // Exemplo de envio da solicitação para a API
        // fetch('URL_DA_API', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ email }),
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log('Sucesso:', data);
        // })
        // .catch((error) => {
        //     console.error('Erro:', error);
        // });
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Aqui você vai recuperar a sua senha</h2>
            <div className="container d-flex justify-content-end mt-3">
                <Link to="/" className="btn btn-primary ml-3">Voltar</Link>
            </div>

            <div className="d-flex justify-content-center mt-4">
                <form onSubmit={handleSubmit} className="d-flex justify-content-center" style={st}>
                    
                    <div className="col-sm-8">
                        <TextInput
                            label="Digite o seu e-mail"
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={handleChange}
                            className="w-100"
                        />
                    </div>
                    <div className="container d-flex justify-content-center align-items-center">
                        <button type="submit" className="btn btn-warning">Recuperar senha</button>
                    </div>
                </form>
            </div>

            <div className="container mt-4" style={st}>
                <h4>Adicione o e-mail no campo de texto e depois sigas as seguintes instruções:</h4>
                <ol>
                    <li>Você receberá um e-mail com instruções para recuperar sua senha.</li>
                    <li>Siga as instruções do e-mail para recuperar sua senha.</li>
                </ol>
            </div>
        </div>
    );
}

export default RecuperarSenha;
