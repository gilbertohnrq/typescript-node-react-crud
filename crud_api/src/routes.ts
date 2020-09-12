import { Router, Request, Response } from 'express';

import {
  getFuncionarios,
  saveFuncionario,
  getFuncionario,
  updateFuncionario,
  removeFuncionario,
} from './controller/FuncionariosController';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'Hello World!' });
});

routes.get('/funcionarios', getFuncionarios);
routes.get('/funcionarios/:id', getFuncionario);
routes.post('/funcionarios', saveFuncionario);
routes.put('/funcionarios/:id', updateFuncionario);
routes.delete('/funcionarios/:id', removeFuncionario);

export default routes;
