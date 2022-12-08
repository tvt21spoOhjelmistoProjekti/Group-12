const { should } = require('chai');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http')
chai.use(chaiHttp);

const serverAddress = 'http://localhost:3000'

describe('Create user API tests', function() {

    describe('POST create user', function() {

        it('should reject for incorrect data types', function() {
            chai.request(serverAddress)
            .post('/login/signup')
            .send({
                fullname: "Testaaja",
                username: 33,
                password: "1234",
                age: "15"
            })
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(404);
            })
        })

        /*it('should reject request with missing fields from data structure', function(){

        })

        it('should reject empty post request', function(){

        }) */

        it('should create user when data correct', function(done){
            chai.request(serverAddress)
            .post('/login/signup')
            .send({
                username: "Tester",
                password: "12345678",
                fullname: "Testaaja",
                age: 15
            })
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            })
        })


        it('should contain the user', function(){
            
        }) 

    })


}) 