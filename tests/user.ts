import { beforeEach, describe, it } from 'mocha';
import { User } from '../app/models/user';
import { sequelize } from '../sequelize';

import * as server from '../server';
import chai from 'chai';
import chaiHttp from 'chai-http';

process.env.TESTING = 'true';
let should = chai.should();

chai.use(chaiHttp);
describe('Users', () => {
    beforeEach(async (done) => {
        User.destroy({
            where: {},
            truncate: true
        });
        done();
    });

    describe('/GET user', () => {
        it('it should GET access to user pages', (done) =>{
            chai.request(server)
                .get('/test/user')
                .end((err,res) => {
                    res.should.have.status(200);
                    done();
                })
        })
    })

})