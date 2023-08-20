const request = require('supertest')
const app = require('../server')
const userInfo = require('./userInfo')
describe('END-POINT users', () => {
let newID="";
var auth = {accessToken:""};

it("POST '/users/reg'", async () => {
    const res = await request(app)
    .post('/users/reg')
    .send({
        "name":"uCode Test",
        "email":"test@ucode.ai",
        "password":"123456"
    })
    expect(res.statusCode).toEqual(200)
    
})


it("Login", async () => {
const login = await request(app)
    .post('/auth')
    .send({
        email: userInfo.email,
        password: userInfo.password
    });
    if(login.statusCode==201){
        auth = login.body;
        console.log(auth.accessToken);
    }
    expect(login.statusCode).toEqual(201)
})      
it("POST '/users/'", async () => {
    const res = await request(app)
    .post('/users')
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "usertype":"1",
"lastname":"voluptate",
"firstname":"officia",
"password":"ucode1234",
"email":"aliqua@ucode.ai4",
"mobile":"laboris7",
"referral":"duis@ucode.ai"
    })
    expect(res.statusCode).toEqual(200)
    newID=res.statusCode==200?res.body["id"]:"";
    
})
it("POST '/users/'", async () => {
    const res = await request(app)
    .post('/users')
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "usertype":"1",
"lastname":"laboris",
"firstname":"nonclf",
"password":"ucode1234",
"email":"nulla@ucode.ai4",
"mobile":"doclf3",
"referral":"quis@ucode.ai"
    })
    expect(res.statusCode).toEqual(200)
    newID=res.statusCode==200?res.body["id"]:"";
    
})
it("GET '/users/'", async () => {
    const res = await request(app)
    .get('/users?usertype=1&lastname=voluptate&firstname=officia&email=aliqua@uco&mobile=laboris7&referral=duis@ucode')
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(200)
    
})

it("GET '/users/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .get('/users/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(200)
}else{
    console.log("**GET[ID] TEST HAS BEEN SKIPED")
}
    
})
it("PATCH '/users/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .patch('/users/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "usertype":"1",
"lastname":"eiusmod",
"firstname":"incididunt",
"password":"ucode1234",
"email":"ex@ucode.ai4",
"mobile":"adipisicing1",
"referral":"cillum@ucode.ai"
    })
    expect(res.statusCode).toEqual(204)
    }else{
        console.log("**PATCH TEST HAS BEEN SKIPED")
    }
})

it("DELETE '/users/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .delete('/users/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(204)
    }else{
        console.log("**DELETE TEST HAS BEEN SKIPED")
    }
})

})
  
