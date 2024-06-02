import React, { useEffect, useState } from "react";

function ListaProdutos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const response = await fetch('http://localhost:8282/produtos', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setProdutos(data);
        } else {
          console.error('Erro ao carregar dados da API:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao carregar dados da API:', error);
      }
    }

    fetchProdutos();
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          <h3>Seus Produtos</h3>
          <table className="table table-hover mt-3">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Quantidade</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto, index) => (
                <tr key={index}>
                  <td>{produto.descricao}</td>
                  <td>{produto.quantidade}</td>
                  <td>
                    <button className="btn btn-danger">Remover</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListaProdutos;
