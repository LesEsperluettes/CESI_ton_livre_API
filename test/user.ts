import { beforeEach, describe, it } from 'mocha';
import { User } from '../app/models/user';
import { sequelize } from '../sequelize';

import server from '../server';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import roleSeeder from '../app/seeders/role.seeder';

let should = chai.should();

async function createUser(username: string, password: string, role: string){
    // Register new user
    const signUpResponse = await chai.request(server)
        .post('/auth/signup')
        .send({
            'username': username,
            'email': username+'@example.com',
            'password': password
        });
    signUpResponse.should.have.status(200);

    // Login new user
    const signInResponse = await chai.request(server)
    .post('/auth/signin')
    .send({
        'username': username,
        'password': password
    });
    signInResponse.should.have.status(200);

    return signInResponse.body.accessToken;
}


let userToken: string = '';

chai.use(chaiHttp);
describe('Users', () => {
    before(async () => {
        await sequelize.sync();
        await roleSeeder();
        
        // Delete every user
        await User.destroy({
            where: {},
            truncate: true
        });
        
        userToken = await createUser('user','user','user');
    });

    describe('/GET test/user', () => {
        it('it should GET access to the user content ', async () =>{
            let result = await chai.request(server)
                .get('/test/user')
                .set('x-access-token',userToken);
            result.should.have.status(200);
        })
    })

})