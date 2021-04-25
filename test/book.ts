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

let book1 = {
    'ISBN': '0385472579',
    'title': 'Zen speaks',
    'authors': 'Zhizhong Cai',
    'publishers': 'Anchor Books',
    'publishedDate': '1994',
    'localisation': 'Shelf B, Position 45'
}

let book2 = {
    'ISBN': '9780451159274',
    'title': 'IT',
    'authors': 'Stephen King',
    'publishers': 'New American Library',
    'publishedDate': '1987-09',
    'localisation': 'Shelf A, Position 10'
}

let userToken: string = '';
let modToken: string = '';
let adminToken: string = '';

chai.use(chaiHttp);
describe('Books', () => {
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

    describe('/POST book', () => {
        it('it should POST a new book (without image)',async () => {
            let res = await chai.request('http://localhost:3000')
                .post('/book')
                .set('x-access-token', adminToken)
                .send(book1);
            res.should.have.status(200);
        })
    })

    describe('/GET book',() => {
        it('it should return a book by his ISBN',async () => {
            let res = await chai.request('http://localhost:3000')
                .get('/book/'+book1.ISBN)
                .set('x-access-token', userToken);
            
            res.should.have.status(200);
            res.body.ISBN.should.to.equal(book1.ISBN);
        })
    })
    

    after(done => {
        server.close(done);
    });

})