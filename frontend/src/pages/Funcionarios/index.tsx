import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

import './index.css';

interface IFuncionario {
  id: number;
  nome: string;
  sobrenome: string;
  cargo: string;
}

const Funcionarios: React.FC = () => {
  const [funcionarios, setFuncionarios] = useState<IFuncionario[]>([]);
  const history = useHistory();

  useEffect(() => {
    loadFuncionarios();
  }, []);

  async function loadFuncionarios() {
    const response = await api.get('/funcionarios');
    console.log(response);
    setFuncionarios(response.data);
  }

  async function removeFuncionario(id: number) {
    await api.delete(`/funcionarios/${id}`);
    loadFuncionarios();
  }

  function newFuncionario() {
    history.push('/funcionarios_cadastro');
  }

  function editFuncionario(id: number) {
    history.push(`/funcionarios_cadastro/${id}`);
  }
  function viewFuncionario(id: number) {
    history.push(`/funcionarios/${id}`);
  }

  return (
    <div className="container">
      <br />
      <div className="funcionario-header">
        <h1>Página de Funcionários</h1>
        <Button variant="dark" onClick={newFuncionario}>
          Novo Funcionário
        </Button>
      </div>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Cargo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((funcionario) => (
            <tr key={funcionario.id}>
              <td>{funcionario.nome}</td>
              <td>{funcionario.sobrenome}</td>
              <td>{funcionario.cargo}</td>
              <td>
                <Button
                  size="sm"
                  onClick={() => editFuncionario(funcionario.id)}
                >
                  Editar
                </Button>{' '}
                <Button
                  size="sm"
                  variant="info"
                  onClick={() => viewFuncionario(funcionario.id)}
                >
                  Visualizar
                </Button>{' '}
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => removeFuncionario(funcionario.id)}
                >
                  Remover
                </Button>{' '}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Funcionarios;
