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
        it('it should not POST user info to signup if he already exist', async () => {
            let result = await chai.request('http://localhost:3000')
                .post('/auth/signup')
                .send(user);
            result.should.have.status(400);
        })
    })

    describe('/POST /auth/signin', () => {
        it('it should POST user token after signing in', async () => {
            let result = await chai.request('http://localhost:3000')
                .post('/auth/signin')
                .send({
                    'username': user.username,
                    'password': user.password
                });
            result.should.have.status(200);
            result.body.should.have.property('accessToken');
        })
        it('it should return 401 if the password is wrong', async () => {
            let result = await chai.request('http://localhost:3000')
                .post('/auth/signin')
                .send({
                    'username': user.username,
                    'password': 'wrong password'
                });
            result.should.have.status(401);
        })
    })

    after(done => {
        server.close(done);
    });

})