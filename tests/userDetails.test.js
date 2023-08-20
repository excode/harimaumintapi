const request = require('supertest')
const app = require('../server')
const userInfo = require('./userInfo')
describe('END-POINT userdetails', () => {
let newID="";
var auth = {accessToken:""};

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
it("POST '/userdetails/'", async () => {
    const res = await request(app)
    .post('/userdetails')
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "address":"Aliquip cillum adipisicing sit exercitation eu id cupidatat sit.",
"icpassport":"et",
"photo":"",
"icdocument":""
    })
    expect(res.statusCode).toEqual(200)
    newID=res.statusCode==200?res.body["id"]:"";
    
})
it("POST '/userdetails/'", async () => {
    const res = await request(app)
    .post('/userdetails')
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "address":"Mollit consequat dolor ullamco nulla sunt laboris.",
"icpassport":"tempor",
"photo":"",
"icdocument":""
    })
    expect(res.statusCode).toEqual(200)
    newID=res.statusCode==200?res.body["id"]:"";
    
})
it("GET '/userdetails/'", async () => {
    const res = await request(app)
    .get('/userdetails?address=Aliquip ci&icpassport=et&photo=&icdocument=')
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(200)
    
})

it("GET '/userdetails/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .get('/userdetails/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(200)
}else{
    console.log("**GET[ID] TEST HAS BEEN SKIPED")
}
    
})
it("PATCH '/userdetails/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .patch('/userdetails/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "address":"Tempor ullamco eu nostrud incididunt deserunt minim.",
"icpassport":"fugiat",
"photo":"",
"icdocument":""
    })
    expect(res.statusCode).toEqual(204)
    }else{
        console.log("**PATCH TEST HAS BEEN SKIPED")
    }
})

it("DELETE '/userdetails/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .delete('/userdetails/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(204)
    }else{
        console.log("**DELETE TEST HAS BEEN SKIPED")
    }
})

})
  
