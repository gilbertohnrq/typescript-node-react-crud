import { getRepository } from 'typeorm';
import { Funcionarios } from '../entity/Funcionarios';
import { NextFunction, Request, Response } from 'express';

export const getFuncionarios = async (request: Request, response: Response) => {
  const funcionarios = await getRepository(Funcionarios).find();
  return response.json(funcionarios);
};

export const getFuncionario = async (request: Request, response: Response) => {
  const { id } = request.params;
  const funcionario = await getRepository(Funcionarios).findOne(id);
  return response.json(funcionario);
};

export const saveFuncionario = async (request: Request, response: Response) => {
  const funcionario = await getRepository(Funcionarios).save(request.body);
  return response.json(funcionario);
};

export const updateFuncionario = async (
  request: Request,
  response: Response
) => {
  const { id } = request.params;

  const funcionario = await getRepository(Funcionarios).update(
    id,
    request.body
  );

  if (funcionario.affected === 1) {
    const funcionarioUpdated = await getRepository(Funcionarios).findOne(id);
    return response.json(funcionarioUpdated);
  }

  return response.status(404).json({ message: 'Funcionário não encontrado!' });
};

export const removeFuncionario = async (
  request: Request,
  response: Response
) => {
  const { id } = request.params;

  const funcionario = await getRepository(Funcionarios).delete(id);

  if (funcionario.affected === 1) {
    const funcionario = await getRepository(Funcionarios).findOne(id);
    return response.json({ message: 'Funcionário removido' });
  }

  return response.status(404).json({ message: 'Funcionário não encontrado!' });
};
