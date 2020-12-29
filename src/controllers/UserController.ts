import { Request, Response } from 'express';
import { ClientService } from '../services/Client';
import jwt from 'jsonwebtoken';
import knex from '../database/connection';

class UserController {

    constructor() {

    }
    async listClients(request: Request, response: Response) {
        const clientService = new ClientService();
        const clients = await clientService.getAllClients()

        return response.json(clients);
    }

    async login(request: Request, response: Response) {
        const { cpf, dataNascimento } = request.body

        const clientService = new ClientService();

        const client = await clientService.getClient(cpf, dataNascimento);

        if (!client) {
            return response.send('User not found');
        }

        const token = jwt.sign({ id: client.idcliente }, 'Nyh4ZSR2XUWyt8yXjJt3', { expiresIn: '1d' })

        return response.json({
            client,
            token
        });
    }

    async listPhones(request: Request, response: Response) {
        const clientService = new ClientService();

        const { client, phones } = await clientService.getPhones(request.userId);

        return response.json({ client, phones });
    }
}

export default new UserController();