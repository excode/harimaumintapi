const request = require('supertest')
const app = require('../server')
const userInfo = require('./userInfo')
describe('END-POINT deposit', () => {
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
it("POST '/deposit/'", async () => {
    const res = await request(app)
    .post('/deposit')
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "wallettype":"utclf",
"wallet":"irure",
"amount":"1.35",
"document":"",
"method":"elit",
"comments":"Esse officia eiusmod pariatur enim non.",
"status":"nostrud"
    })
    expect(res.statusCode).toEqual(200)
    newID=res.statusCode==200?res.body["id"]:"";
    
})
it("POST '/deposit/'", async () => {
    const res = await request(app)
    .post('/deposit')
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "wallettype":"reprehenderit",
"wallet":"euclf",
"amount":"1.35",
"document":"",
"method":"pariatur",
"comments":"Sunt aliquip aliqua consequat.",
"status":"euclf"
    })
    expect(res.statusCode).toEqual(200)
    newID=res.statusCode==200?res.body["id"]:"";
    
})
it("GET '/deposit/'", async () => {
    const res = await request(app)
    .get('/deposit?wallettype=utclf&wallet=irure&amount=1.35&document=&method=elit&comments=Esse offic&status=nostrud')
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(200)
    
})

it("GET '/deposit/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .get('/deposit/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(200)
}else{
    console.log("**GET[ID] TEST HAS BEEN SKIPED")
}
    
})
it("PATCH '/deposit/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .patch('/deposit/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "wallettype":"cupidatat",
"wallet":"culpa",
"amount":"1.35",
"document":"",
"method":"tempor",
"comments":"Enim esse veniam excepteur laboris esse sint magna ipsum esse minim quis officia.",
"status":"nonclf"
    })
    expect(res.statusCode).toEqual(204)
    }else{
        console.log("**PATCH TEST HAS BEEN SKIPED")
    }
})

it("DELETE '/deposit/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .delete('/deposit/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(204)
    }else{
        console.log("**DELETE TEST HAS BEEN SKIPED")
    }
})

})
  
