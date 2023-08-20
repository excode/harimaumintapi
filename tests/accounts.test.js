const request = require('supertest')
const app = require('../server')
const userInfo = require('./userInfo')
describe('END-POINT accounts', () => {
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
it("POST '/accounts/'", async () => {
    const res = await request(app)
    .post('/accounts')
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "accounttype":"fugiat",
"quantity":"1.35",
"unitprice":"1.35",
"total":"1.35",
"maturedate":"2023-05-07",
"termscount":"1",
"monthcount":"1",
"status":"cupidatat",
"block":"false",
"owner":"est@ucode.ai"
    })
    expect(res.statusCode).toEqual(200)
    newID=res.statusCode==200?res.body["id"]:"";
    
})
it("POST '/accounts/'", async () => {
    const res = await request(app)
    .post('/accounts')
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "accounttype":"aliqua",
"quantity":"1.35",
"unitprice":"1.35",
"total":"1.35",
"maturedate":"2023-05-07",
"termscount":"1",
"monthcount":"1",
"status":"fugiat",
"block":"false",
"owner":"laboris@ucode.ai"
    })
    expect(res.statusCode).toEqual(200)
    newID=res.statusCode==200?res.body["id"]:"";
    
})
it("GET '/accounts/'", async () => {
    const res = await request(app)
    .get('/accounts?accounttype=fugiat&quantity=1.35&unitprice=1.35&total=1.35&maturedate=2023-05-07&termscount=1&monthcount=1&status=cupidatat&block=false&owner=est@ucode.')
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(200)
    
})

it("GET '/accounts/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .get('/accounts/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(200)
}else{
    console.log("**GET[ID] TEST HAS BEEN SKIPED")
}
    
})
it("PATCH '/accounts/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .patch('/accounts/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "accounttype":"idclf",
"quantity":"1.35",
"unitprice":"1.35",
"total":"1.35",
"maturedate":"2023-05-07",
"termscount":"1",
"monthcount":"1",
"status":"commodo",
"block":"false",
"owner":"ad@ucode.ai"
    })
    expect(res.statusCode).toEqual(204)
    }else{
        console.log("**PATCH TEST HAS BEEN SKIPED")
    }
})

it("DELETE '/accounts/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .delete('/accounts/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(204)
    }else{
        console.log("**DELETE TEST HAS BEEN SKIPED")
    }
})

})
  
