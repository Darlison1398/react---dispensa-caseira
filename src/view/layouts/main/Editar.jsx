import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

function EditarProduto() {
  const { id } = useParams();
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProduto() {
      try {
        const response = await fetch(`http://localhost:8282/produtos/obterProduto/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setDescricao(data.descricao);
          setQuantidade(data.quantidade);

        } else {
          console.error('Erro ao carregar dados do produto:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao carregar dados do produto:', error);
      }
    }

    fetchProduto();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'descricao'){
        setDescricao(value);
    } else if (name === 'quantidade') {
        setQuantidade(value);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8282/produtos/editarProduto/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },

        body: JSON.stringify({
          descricao: descricao,
          quantidade: quantidade
        }),

      });

      if (response.ok) {
        navigate("/main/listaProdutos");
      } else {
        const errorData = await response.json();
        console.error('Erro ao editar o produto:', errorData.message);
      }
    } catch (error) {
      console.error('Erro ao editar o produto:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Editar Produto</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formDescricao">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            type="text"
            name="descricao"
            value={descricao}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formQuantidade">
          <Form.Label>Quantidade</Form.Label>
          <Form.Control
            type="number"
            name="quantidade"
            value={quantidade}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Editar produto
        </Button>
      </Form>
    </div>
  );
}

export default EditarProduto;
