const request = require('supertest')
const app = require('../server')
const userInfo = require('./userInfo')
describe('END-POINT withdraw', () => {
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
it("POST '/withdraw/'", async () => {
    const res = await request(app)
    .post('/withdraw')
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "wallettype":"laboris",
"wallet":"culpa",
"amount":"1.35",
"status":"esse",
"comment":"Aliquip non aliqua duis proident enim culpa dolor labore."
    })
    expect(res.statusCode).toEqual(200)
    newID=res.statusCode==200?res.body["id"]:"";
    
})
it("POST '/withdraw/'", async () => {
    const res = await request(app)
    .post('/withdraw')
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "wallettype":"aliqua",
"wallet":"quiclf",
"amount":"1.35",
"status":"Lorem",
"comment":"Quis mollit minim Lorem non laboris incididunt esse occaecat."
    })
    expect(res.statusCode).toEqual(200)
    newID=res.statusCode==200?res.body["id"]:"";
    
})
it("GET '/withdraw/'", async () => {
    const res = await request(app)
    .get('/withdraw?wallettype=laboris&wallet=culpa&amount=1.35&status=esse&comment=Aliquip no')
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(200)
    
})

it("GET '/withdraw/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .get('/withdraw/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(200)
}else{
    console.log("**GET[ID] TEST HAS BEEN SKIPED")
}
    
})
it("PATCH '/withdraw/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .patch('/withdraw/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "wallettype":"elit",
"wallet":"reprehenderit",
"amount":"1.35",
"status":"utclf",
"comment":"Enim fugiat aliquip ipsum quis elit exercitation duis et occaecat ad."
    })
    expect(res.statusCode).toEqual(204)
    }else{
        console.log("**PATCH TEST HAS BEEN SKIPED")
    }
})

it("DELETE '/withdraw/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .delete('/withdraw/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(204)
    }else{
        console.log("**DELETE TEST HAS BEEN SKIPED")
    }
})

})
  
