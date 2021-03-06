
import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../src/index';

chai.should();
chai.use(chaiHttp);

describe('Request orders', () => {
  it('user can make order request', (done) => {
    const order = {
      buyer: 1,
      car_id: 1,
      amount: 3000,
      status: 'Pending',
    };

    const user_token = {
      id:1 ,
      email:"emmanuelmunezero@gmail.com",
      first_name:"munezero",
      last_name:"emmanuel",
      is_admin: 'false',
    };
    const token =jwt.sign({ user_token }, 'scretkey');
    chai.request(app)
      .post('/api/v1/order')
      .set('x-auth-token', token)
      .send(order)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('data');
        res.body.status.should.eql(200);
        done();
      });
  });


  it('user pass invalid data', (done) => {
    const order = {
      buyer:1,
      car_id:'1sff',
      amount:'3000',
      status: 'Pending',
    };

    const user_token = {
      id:1 ,
      email:"emmanuelmunezero@gmail.com",
      first_name:"munezero",
      last_name:"emmanuel",
      is_admin: 'false',
    };
    const token =jwt.sign({ user_token }, 'scretkey');
    chai.request(app)
      .post('/api/v1/order')
      .set('x-auth-token', token)
      .send(order)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('error');
       
        done();
      });
  });




});
