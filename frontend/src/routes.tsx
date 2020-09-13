import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Funcionarios from './pages/Funcionarios';
import FuncionariosForm from './pages/Funcionarios/Form';
import FuncionariosDetail from './pages/Funcionarios/Detail';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/funcionarios" exact component={Funcionarios} />
      <Route path="/funcionarios_cadastro" exact component={FuncionariosForm} />
      <Route
        path="/funcionarios_cadastro/:id"
        exact
        component={FuncionariosForm}
      />
      <Route path="/funcionarios/:id" exact component={FuncionariosDetail} />
    </Switch>
  );
};

export default Routes;
