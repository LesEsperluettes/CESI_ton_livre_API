import { beforeEach, describe, it } from 'mocha';
import { User } from '../app/models/user';
import { sequelize } from '../sequelize';

import app from '../server';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import * as helpers from './helpers';
import { Server } from 'node:http';

let should = chai.should();

async function createUser(username: string, password: string, role: number) {
    // Register new user
    const signUpResponse = await chai.request(app)
        .post('/auth/signup')
        .send({
            'username': username,
            'email': username + '@example.com',
            'password': password
        });
    signUpResponse.should.have.status(200);

    // Login new user
    const signInResponse = await chai.request(app)
        .post('/auth/signin')
        .send({
            'username': username,
            'password': password
        });
    signInResponse.should.have.status(200);
    
    // Setup role
    const user = await User.findByPk(signInResponse.body.id);
    await user?.$add('roles', role);

    return signInResponse.body.accessToken;
}

let server: Server;
let userToken: string = '';
let modToken: string = '';
let adminToken: string = '';

chai.use(chaiHttp);
describe('Users', () => {
    before((done) => {
        helpers.resetDatabase(() => {
            // Create user
            createUser('user', 'user', 1).then((token) => {
                userToken = token;
                // Create moderator
                createUser('mod','mod',2).then((token2) => {
                    modToken = token2;
                    // Create admin
                    createUser('admin','admin',3).then((token3) => {
                        adminToken = token3;
                        server = app.listen(3000,done)
                    })
                })
            })
        });
    });

    /* User */
    describe('/GET test', () => {
        it('it should GET access to the user content ', async () => {
            let result = await chai.request('http://localhost:3000')
                .get('/test/user')
                .set('x-access-token', userToken);
            result.should.have.status(200);
        })
        it('it should not GET access to the moderator content ', async () => {
            let result = await chai.request('http://localhost:3000')
                .get('/test/mod')
                .set('x-access-token', userToken);
            result.should.have.status(403);
        })
        it('it should not GET access to the admin content ', async () => {
            let result = await chai.request('http://localhost:3000')
                .get('/test/admin')
                .set('x-access-token', userToken);
            result.should.have.status(403);
        })
    })

    /* Mod */
    describe('/GET test', () => {
        it('it should GET access to the user content ', async () => {
            let result = await chai.request('http://localhost:3000')
                .get('/test/user')
                .set('x-access-token', modToken);
            result.should.have.status(200);
        })
        it('it should GET access to the moderator content ', async () => {
            let result = await chai.request('http://localhost:3000')
                .get('/test/mod')
                .set('x-access-token', modToken);
            result.should.have.status(200);
        })
        it('it should not GET access to the admin content ', async () => {
            let result = await chai.request('http://localhost:3000')
                .get('/test/admin')
                .set('x-access-token', modToken);
            result.should.have.status(403);
        })
    })

    /* Admin */
    describe('/GET test', () => {
        it('it should GET access to the user content ', async () => {
            let result = await chai.request('http://localhost:3000')
                .get('/test/user')
                .set('x-access-token', adminToken);
            result.should.have.status(200);
        })
        it('it should GET access to the moderator content ', async () => {
            let result = await chai.request('http://localhost:3000')
                .get('/test/mod')
                .set('x-access-token', adminToken);
            result.should.have.status(200);
        })
        it('it should GET access to the admin content ', async () => {
            let result = await chai.request('http://localhost:3000')
                .get('/test/admin')
                .set('x-access-token', adminToken);
            result.should.have.status(200);
        })
    })

    after(done => {
        server.close(done);
    });
})