import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Funcionarios from './pages/Funcionarios';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/funcionarios" exact component={Funcionarios} />
    </Switch>
  );
};

export default Routes;
