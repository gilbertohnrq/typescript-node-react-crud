import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import api from '../../services/api';

interface IFuncionario {
  id: number;
  nome: string;
  sobrenome: string;
  cargo: string;
  data_de_nascimento: string;
  salario: number;
}

const Funcionarios: React.FC = () => {
  const [funcionarios, setFuncionarios] = useState<IFuncionario[]>([]);

  useEffect(() => {
    loadFuncionarios();
  }, []);

  async function loadFuncionarios() {
    const response = await api.get('/funcionarios');
    console.log(response);
    setFuncionarios(response.data);
  }

  return (
    <div className="container">
      <br />
      <h1>Página de Funcionários</h1>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Cargo</th>
            <th>Data de Nascimento</th>
            <th>Salário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((funcionario) => (
            <tr key={funcionario.id}>
              <td>{funcionario.id}</td>
              <td>{funcionario.nome}</td>
              <td>{funcionario.sobrenome}</td>
              <td>{funcionario.cargo}</td>
              <td>{funcionario.data_de_nascimento}</td>
              <td>{funcionario.salario}</td>
              <td>
                <Button size="sm">Editar</Button>
                {'  '}
                <Button size="sm" variant="info">
                  Visualizar
                </Button>
                {'  '}
                <Button size="sm" variant="danger">
                  Remover
                </Button>
                {'  '}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Funcionarios;
