const request = require('supertest')
const app = require('../server')
const userInfo = require('./userInfo')
describe('END-POINT wallettype', () => {
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
it("POST '/wallettype/'", async () => {
    const res = await request(app)
    .post('/wallettype')
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "name":"sunt",
"code":"esse",
"decimalposition":"7",
"maxtransfer":"1.35",
"active":"false"
    })
    expect(res.statusCode).toEqual(200)
    newID=res.statusCode==200?res.body["id"]:"";
    
})
it("POST '/wallettype/'", async () => {
    const res = await request(app)
    .post('/wallettype')
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "name":"ipsum",
"code":"utclf",
"decimalposition":"5",
"maxtransfer":"1.35",
"active":"false"
    })
    expect(res.statusCode).toEqual(200)
    newID=res.statusCode==200?res.body["id"]:"";
    
})
it("GET '/wallettype/'", async () => {
    const res = await request(app)
    .get('/wallettype?name=sunt&code=esse&decimalposition=7&maxtransfer=1.35&active=false')
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(200)
    
})

it("GET '/wallettype/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .get('/wallettype/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(200)
}else{
    console.log("**GET[ID] TEST HAS BEEN SKIPED")
}
    
})
it("PATCH '/wallettype/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .patch('/wallettype/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "name":"tempor",
"code":"anim",
"decimalposition":"5",
"maxtransfer":"1.35",
"active":"false"
    })
    expect(res.statusCode).toEqual(204)
    }else{
        console.log("**PATCH TEST HAS BEEN SKIPED")
    }
})

it("DELETE '/wallettype/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .delete('/wallettype/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(204)
    }else{
        console.log("**DELETE TEST HAS BEEN SKIPED")
    }
})

})
  
