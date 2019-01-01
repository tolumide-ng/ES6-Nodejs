// Import dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server.js'

// configure chai
const expect = chai.expect;
chai.use(chaiHttp);
chai.should();

describe('Meetups', () => {
    describe('#GET /v1/meetups', function(){
        it('should return all meetups', function(done) {
            chai.request('http://localhost:3000')
                .get('/v1/meetups')
                .then(function (res) {
                    expect(res).to.have.status(200);
                })
                .catch(function (err) {
                    throw err;
                });
                done();
        });
    })


    describe('#POST /v1/meetups', function(){
        it('should add a new meetup to the meetups array', function(done) {
            chai.request('http://localhost:3000')
                .post('/v1/meetups')
                .then(function (res) {
                    expect(req).to.be.json;
                    expect(res).to.have.status(200);
                })
                .catch(function (err) {
                    throw err;
                })
                done();
        })
    })
})
