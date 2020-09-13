import React, { useState, useEffect, ChangeEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import api from '../../../services/api';

import './index.css';

interface IFuncionario {
  nome: string;
  sobrenome: string;
  cargo: string;
  descricao_cargo: string;
  data_de_nascimento: string;
  salario: number;
}

interface IParams {
  id: string;
}

const Funcionarios: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<IParams>();

  const [model, setModel] = useState<IFuncionario>({
    nome: '',
    sobrenome: '',
    cargo: '',
    descricao_cargo: '',
    data_de_nascimento: '',
    salario: 0,
  });

  useEffect(() => {
    if (id !== undefined) {
      findFuncionario(id);
    }
  }, [id]);

  function updatedModel(e: ChangeEvent<HTMLInputElement>) {
    setModel({
      ...model,
      [e.target.name]: e.target.value,
    });
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (id !== undefined) {
      const response = await api.put(`/funcionarios/${id}`, model);
    } else {
      const response = await api.post('/funcionarios', model);
    }
    back();
  }

  async function findFuncionario(id: string) {
    const response = await api.get(`funcionarios/${id}`);
    setModel({
      nome: response.data.nome,
      sobrenome: response.data.sobrenome,
      cargo: response.data.cargo,
      descricao_cargo: response.data.descricao_cargo,
      data_de_nascimento: response.data.data_de_nascimento,
      salario: response.data.salario,
    });
  }

  function back() {
    history.goBack();
  }

  return (
    <div>
      <br />
      <div className="funcionario-header">
        <h3>Novo Funcionário</h3>
        <Button variant="dark" onClick={back}>
          Voltar
        </Button>
      </div>
      <br />
      <div className="container">
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="nome"
              value={model.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              placeholder="Nome do funcionário"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Sobrenome</Form.Label>
            <Form.Control
              type="text"
              name="sobrenome"
              value={model.sobrenome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              placeholder="Sobrenome do funcionário"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Data de nascimento</Form.Label>
            <Form.Control
              type="date"
              name="data_de_nascimento"
              value={model.data_de_nascimento}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              placeholder="Nome do funcionário"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Salário</Form.Label>
            <Form.Control
              type="number"
              name="salario"
              value={model.salario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              placeholder="Salário do funcionário"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Cargo</Form.Label>
            <Form.Control
              type="text"
              name="cargo"
              value={model.cargo}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              placeholder="Cargo do funcionário"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Descrição do Cargo</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descricao_cargo"
              value={model.descricao_cargo}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              placeholder="Descrição do cargo do funcionário"
            />
          </Form.Group>

          <Button variant="dark" type="submit">
            Salvar
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Funcionarios;
