import { beforeEach, describe, it } from 'mocha';
import { User } from '../app/models/user';
import { sequelize } from '../sequelize';

import server from '../server';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { textChangeRangeNewSpan } from 'typescript';

import roleSeeder from '../app/seeders/role.seeder';

let should = chai.should();

let user = {
    'username': 'user',
    'email': 'user@example.com',
    'password': 'user'
}

chai.use(chaiHttp);
describe('User signup', () => {
    before(async () => {
        await sequelize.sync();
        await roleSeeder();

        // Delete every user
        await User.destroy({
            where: {},
            truncate: true
        });
    });


    describe('/POST /auth/signup', () => {
        it('it should POST user info to signup', async () =>{
            let result = await chai.request(server)
                .post('/auth/signup')
                .send(user);
            result.should.have.status(200);
        })
    })

})