const { should } = require('chai');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http')
chai.use(chaiHttp);

const serverAddress = 'http://localhost:3000'
var testId = 0
var testAuth = ""

describe('Create user API tests', function() {

    describe('POST create user', function() {

        it('should reject for incorrect data types', function(done) {
            chai.request(serverAddress)
            .post('/login/signup')
            .send({
                fullname: "Testaaja",                                                                           //Testing create user backend
                username: 33,
                password: "1234",
                age: "fifteen"
            })
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(403);
                done();
            })
        })

        it('should reject request with missing fields from data structure', function(done){
            chai.request(serverAddress)
            .post('/login/signup')
            .send({
                fullname: "Testaaja",
                username: "Tester96",
                age: 15
            })
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            })
        })

        it('should reject empty post request', function(done){
            chai.request(serverAddress)
            .post('/login/signup')
            .send()
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            })
        })

        it('should create user when data correct', function(done){
            chai.request(serverAddress)
            .post('/login/signup')
            .send({
                username: "Tester56",
                password: "12345678",
                fullname: "Testaaja",
                age: 15
            })
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                testId = res.body.idUsers;
                testAuth = res.body.token
                
                done();
                
            })
        })
    })
}) 

/////////////////////////////////////////////////////////

describe('Login API tests', function() {

    describe('POST login', function() {

        it('should reject for wrong password', function(done) {
            chai.request(serverAddress)
            .post('/login')
            .send({
                username: "Tester56",
                password: "1234"
            })                                                                                                                                      //Testing login backend
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(403);
                done();
            })
        })

        it('should reject request with missing fields from data structure', function(done){
            chai.request(serverAddress)
            .post('/login')
            .send({
                username: "Tester56",
            })
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            })
        })

        it('should reject empty login request', function(done){
            chai.request(serverAddress)
            .post('/login')
            .send()
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            })
        })

        it('should login when data is correct', function(done){
            chai.request(serverAddress)
            .post('/login')
            .send({
                username: "Tester56",
                password: "12345678",
            })
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);                
                done();
                
            })
        })
    })
})

/////////////////////////////////////////////////////////

describe('Delete user API tests', function() {

    describe('POST delete user', function() {

        it('should reject for no authorization', function(done){
            chai.request(serverAddress)
            .delete('/deleteuser/'+testId)
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(401);
                done();
            })
        })

        it('should reject for no user ID', function(done){                                                                  //Testing delete user backend
            chai.request(serverAddress)
            .delete('/deleteuser/')
            .set('Authorization', `Basic ${testAuth}`)
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(404);
                done();
            })
        })

        it('should delete test user', function(done){
            chai.request(serverAddress)
            .delete('/deleteuser/' + testId)
            .set('Authorization', `Basic ${testAuth}`)
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            })
        })

        

    })


}) 