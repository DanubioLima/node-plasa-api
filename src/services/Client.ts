import knex from '../database/connection';

export class ClientService {
    constructor() {
    }

    async getAllClients() {
        const clients = await knex.select('*').from('cliente');
        return clients;
    }

    async getClient(cpf: string, dataNascimento: string) {
        const client = await knex('cliente').where({
            cpfcliente: cpf,
            datanascimentocliente: dataNascimento,
        }).select('*').first();

        return client;
    }

    async getPhones(userId: string) {
        const client = await knex('cliente').where('idcliente', userId).first();

        const phones = await knex('telefones').join('cliente', 'telefones.idcliente', '=', 'cliente.idcliente')
            .where('telefones.idcliente', userId).select('*')

        return {
            client,
            phones
        }

    }
}