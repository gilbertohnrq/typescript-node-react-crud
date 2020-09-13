import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import api from '../../../services/api';
import moment from 'moment';

interface IFuncionario {
  id: number;
  nome: string;
  sobrenome: string;
  cargo: string;
  descricao_cargo: string;
  data_de_nascimento: Date;
  salario: string;
  created_at: Date;
  updated_at: Date;
}

interface IParams {
  id: string;
}

const Detail: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<IParams>();
  const [funcionario, setFuncionario] = useState<IFuncionario>();

  useEffect(() => {
    findFuncionario();
  }, [findFuncionario, id]);

  function back() {
    history.goBack();
  }

  async function findFuncionario() {
    const response = await api.get<IFuncionario>(`/funcionarios/${id}`);
    setFuncionario(response.data);
  }

  function formatDate(date: Date | undefined) {
    return moment(date).format('DD/MM/YYYY');
  }

  return (
    <div className="container">
      <br />
      <div className="funcionario-header">
        <h1>Detalhes do Funcionário</h1>
        <Button variant="dark" onClick={back}>
          Voltar
        </Button>
      </div>
      <br />
      <Card>
        <Card.Body>
          <Card.Title>{funcionario?.nome}</Card.Title>
          <Card.Text>
            <strong>Nascido em:</strong>{' '}
            {formatDate(funcionario?.data_de_nascimento)}
          </Card.Text>
          <Card.Text>
            <strong>Cargo: </strong>
            {funcionario?.cargo}
          </Card.Text>
          <Card.Text>
            <strong>Descrição do cargo: </strong>
            {funcionario?.descricao_cargo}
          </Card.Text>
          <Card.Text>
            <strong>Salário: </strong>
            {funcionario?.salario}
          </Card.Text>
          <Card.Text>
            <strong>Criado em: </strong>
            {formatDate(funcionario?.created_at)}
          </Card.Text>
          <Card.Text>
            <strong>Atualizado em: </strong>
            {formatDate(funcionario?.updated_at)}
          </Card.Text>
          <br />
        </Card.Body>
      </Card>
    </div>
  );
};

export default Detail;
