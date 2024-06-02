import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import CustomModal from "../../components/CustomModal";
import { Button } from "react-bootstrap";


function ListaProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [produtoToDelete, setProdutoToDelete] = useState(null);
  const [produtoToView, setProdutoToView] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

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

  async function handleDelete(produtoId) {
    try {
      const response = await fetch(`http://localhost:8282/produtos/deletarProduto/${produtoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (response.ok) {
        // Remove o produto do estado
        setProdutos(produtos.filter(produto => produto.id !== produtoId));
        handleCloseModal();
      } else {
        console.error('Erro ao excluir o produto:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao excluir o produto:', error);
    }
  }

  function handleShowModal(produtoId) {
    setProdutoToDelete(produtoId);
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
    setProdutoToDelete(null);
  }

  function handleShowViewModal(produto) {
    setProdutoToView(produto);
    setShowViewModal(true);
  }

  function handleCloseViewModal() {
    setShowViewModal(false);
    setProdutoToView(null);
  }

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
                  <td style={{display: "flex", gap: "10px"}}>
                    <div>
                      <Link to="#" onClick={() => handleShowViewModal(produto)}>
                        <FontAwesomeIcon icon={faEye} className="btn btn-success"/>
                      </Link>
                    </div>
                    <div>
                      <Link to={`/main/editar/${produto.id}`}>
                        <FontAwesomeIcon icon={faPencil} className="btn btn-primary" />
                      </Link>
                    </div>
                    <div>
                      <FontAwesomeIcon 
                        icon={faTrash}
                        className="btn btn-danger"
                        onClick={() => handleShowModal(produto.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CustomModal
        show={showModal}
        handleClose={handleCloseModal}
        title="Confirmação de Exclusão"
        body="Você tem certeza que deseja excluir este produto?"
        footer={
          <>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={() => handleDelete(produtoToDelete)}>
              Excluir
            </Button>
          </>
        }
      />

      <CustomModal
        show={showViewModal}
        handleClose={handleCloseViewModal}
        title="Detalhes do Produto"
        body={produtoToView && (
          <div>
            <p><strong>Descrição:</strong> {produtoToView.descricao}</p>
            <p><strong>Quantidade:</strong> {produtoToView.quantidade}</p>
            {/* Adicione mais detalhes conforme necessário */}
          </div>
        )}
        footer={
          <Button variant="secondary" onClick={handleCloseViewModal}>
            Fechar
          </Button>
        }
      />
    </div>
  );
}

export default ListaProdutos;
