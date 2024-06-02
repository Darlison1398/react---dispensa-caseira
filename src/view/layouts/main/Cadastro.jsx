import React, { useState } from "react";
import TextInput from "../../components/TextInput";
import Flash from "../../components/Flash";
import axios from 'axios';

function Cadastro() {
    const [descricao, setDescricao] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    const handleDescricaoChange = (e) => {
        setDescricao(e.target.value);
    };

    const handleQuantidadeChange = (e) => {
        setQuantidade(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = "http://localhost:8282/produtos/salvarProduto";

        try {
            const response = await axios.post(url, {
                descricao: descricao,
                quantidade: quantidade
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });

            if (response.status === 200) {
                setSuccess('Produto cadastrado com sucesso!');
                setError('');
                setDescricao('');
                setQuantidade('');
                setTimeout(() => {
                    setSuccess('');
                }, 5000);
            }

        } catch (error) {
            setError('Falha ao cadastrar o produto!');
            console.log(error);
        }
    };

    return (
        <div className="container">

            <Flash type="error" message={error} setMessage={setError} />
            {success && <Flash type="success" message={success} setMessage={setSuccess} />}
            
            <div  className="container mt-5 justify-content-center align-items-center d-flex">
                <div className="container-center-center">
                    <div className="container">
                        <h3 className="text-center">Cadastrar produto</h3>
                        <form className="mt-3" onSubmit={handleSubmit}>
                            <TextInput
                                label="Descrição"
                                type="text"
                                placeholder="Descrição do produto"
                                value={descricao}
                                onChange={handleDescricaoChange}
                            />
                            <TextInput
                                label="Quantidade"
                                type="number"
                                placeholder="Quantidade"
                                value={quantidade}
                                onChange={handleQuantidadeChange}
                            />
                            <button type="submit" className="btn btn-primary btn-block">Cadastrar produto</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cadastro;
