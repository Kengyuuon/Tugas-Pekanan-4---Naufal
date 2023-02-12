const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
require('dotenv').config()

chai.use(chaiHttp)

const api = chai.request(process.env.BASE_URL)
//AccessToken
describe("Test User Login", function(){
    it("Succes login", function(done){
        api.post("/authentications")
        .set('Content-Type','Application/json')
        .send( {
            email: 'naufalzm14@gmail.com',
            password: 'Toko123'
        })
        .end (function(error, response){
            expect(response.status).to.equals(201)
            global.token = response.body.data.accessToken;
            console.log(response.body.data.accessToken)
            done();
        })
    })
})

//CreateUser
describe("Test Create User", function(){
    it("Succes Create User", function(done){
        api.post("/users")
        .set('Content-Type','Application/json')
        .set('Authorization', 'Bearer '+ global.token)
        .send( {
            name: 'kasircreate',
            email: 'naufalzm@gmail.com',
            password: 'Toko345'
        })
        .end (function(error, response){
            expect(response.status).to.equals(201)
            expect(response.body.data).to.have.a.property('userId');
            expect(response.body.data).to.have.a.property('name');
            global.userIds = response.body.data.userId;
            //console.log(response.body.data.userId)
            //console.log(response.body.data.name)
            console.log(response.body)
            done();
        })
    })
//CreateUserFailed
    it("User Can't create because email invalid", function(done){
        api.post("/users")
        .set('Content-Type','Application/json')
        .set('Authorization', 'Bearer '+ global.token)
        .send( {
            name: 'kasircreate',
            email: 'nnnn',
            password: 'Toko345'
        })
        .end (function(error, response){
            expect(response.status).to.equals(400)
            //expect(response.body.data).to.have.a.property('userId');
            //expect(response.body.data).to.have.a.property('name');
            //global.userIds = response.body.data.userId;
            //console.log(response.body.data.userId)
            //console.log(response.body.data.name)
            console.log(response.body)
            done();
        })
    })
})




//Get User
describe("Test Get User", function(){
    it("Succes Get User", function(done){
        api.get("/users/" + global.userIds)
        .set('Content-Type','Application/json')
        .set('Authorization', 'Bearer '+ global.token)
        //.send( {
            //name: 'kasircreate',
            //email: 'naufalzm@gmail.com',
            //password: 'Toko345'
        //})
        .end (function(error, response){
            expect(response.status).to.equals(200)
            //global.token = response.body.data.accessToken;
            //console.log(response.body.data.userId)
            //console.log(response.body.data.name)
            //global.userId = response.body.data.userId;
            console.log(response.body)
            done();
        })
    })

//NegativeGetUser
    it("Failed Get User because data invalid", function(done){
        api.get("/users/failed")
        .set('Content-Type','Application/json')
        .set('Authorization', 'Bearer '+ global.token)
        //.send( {
            //name: 'kasircreate',
            //email: 'naufalzm@gmail.com',
            //password: 'Toko345'
        //})
        .end (function(error, response){
            expect(response.status).to.equals(404)
            //global.token = response.body.data.accessToken;
            //console.log(response.body.data.userId)
            //console.log(response.body.data.name)
            //global.userId = response.body.data.userId;
            console.log(response.body)
            done();
        })
    })
})

//UpdateUser
describe("Test update User", function(){
    it("Succes Update User", function(done){
        api.put("/users/" + global.userIds)
        .set('Content-Type','Application/json')
        .set('Authorization', 'Bearer '+ global.token)
        .send( {
            name: 'kasirupdate',
            email: 'naufalzm2@gmail.com',
            
        })
        .end (function(error, response){
            expect(response.status).to.equals(200)
            //global.token = response.body.data.accessToken;
            //console.log(response.body.data.userId)
            //console.log(response.body.data.name)
            //global.userId = response.body.data.userId;
            console.log(response.body)
            done();
        })
    })

    //NegativeUpdateUser
    it("Cant Update user because email invalid", function(done){
        api.put("/users/" + global.userIds)
        .set('Content-Type','Application/json')
        .set('Authorization', 'Bearer '+ global.token)
        .send( {
            name: ' updatenegativeuser',
            email: 'naufalzgmail.com',
            
        })
        .end (function(error, response){
            expect(response.status).to.equals(400)
            //global.token = response.body.data.accessToken;
            //console.log(response.body.data.userId)
            //console.log(response.body.data.name)
            //global.userId = response.body.data.userId;
            console.log(response.body)
            done();
        })
    })
})

describe("Test Delete User", function(){
    it("Succes Delete User", function(done){
        api.delete("/users/" + global.userIds)
        .set('Content-Type','Application/json')
        .set('Authorization', 'Bearer '+ global.token)
        //.send( {
            //name: 'kasircreate',
            //email: 'naufalzm@gmail.com',
            //password: 'Toko345'
        //})
        .end (function(error, response){
            expect(response.status).to.equals(200)
            //global.token = response.body.data.accessToken;
            //console.log(response.body.data.userId)
            //console.log(response.body.data.name)
            //global.userId = response.body.data.userId;
            console.log(response.body)
            done();
        })
    })

    //NegativeDeleteUser
    it("Failed Delete User because data invalid", function(done){
        api.delete("/users/failed")
        .set('Content-Type','Application/json')
        .set('Authorization', 'Bearer '+ global.token)
        //.send( {
            //name: 'kasircreate',
            //email: 'naufalzm@gmail.com',
            //password: 'Toko345'
        //})
        .end (function(error, response){
            expect(response.status).to.equals(404)
            //global.token = response.body.data.accessToken;
            //console.log(response.body.data.userId)
            //console.log(response.body.data.name)
            //global.userId = response.body.data.userId;
            console.log(response.body)
            done();
        })
    })
})


            