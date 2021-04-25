import { beforeEach, describe, it } from 'mocha';
import { User } from '../app/models/user';
import { sequelize } from '../sequelize';

import app from '../server';
import chai from 'chai';
import chaiHttp from 'chai-http';

import roleSeeder from '../app/seeders/role.seeder';
import * as helpers from './helpers';
import { Server } from 'node:http';

let should = chai.should();

let server: Server;

let user = {
    'username': 'user',
    'email': 'user@example.com',
    'password': 'user'
}

chai.use(chaiHttp);
describe('User signup', () => {
    before((done) => {
        helpers.resetDatabase(() => {
            server = app.listen(3000, done)
        });
    });

    describe('/POST /auth/signup', () => {
        it('it should POST user info to signup', async () => {
            let result = await chai.request('http://localhost:3000')
                .post('/auth/signup')
                .send(user);
            result.should.have.status(200);
        })
    })

    after(done => {
        server.close(done);
    });

})