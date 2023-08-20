const request = require('supertest')
const app = require('../server')
const userInfo = require('./userInfo')
describe('END-POINT profit', () => {
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
it("POST '/profit/'", async () => {
    const res = await request(app)
    .post('/profit')
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "account":"estclf",
"level":"1",
"username":"occaecat",
"status":"occaecat"
    })
    expect(res.statusCode).toEqual(200)
    newID=res.statusCode==200?res.body["id"]:"";
    
})
it("POST '/profit/'", async () => {
    const res = await request(app)
    .post('/profit')
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "account":"quiclf",
"level":"1",
"username":"proident",
"status":"commodo"
    })
    expect(res.statusCode).toEqual(200)
    newID=res.statusCode==200?res.body["id"]:"";
    
})
it("GET '/profit/'", async () => {
    const res = await request(app)
    .get('/profit?account=estclf&level=1&username=occaecat&status=occaecat')
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(200)
    
})

it("GET '/profit/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .get('/profit/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(200)
}else{
    console.log("**GET[ID] TEST HAS BEEN SKIPED")
}
    
})
it("PATCH '/profit/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .patch('/profit/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "account":"elit",
"level":"1",
"username":"consectetur",
"status":"veniam"
    })
    expect(res.statusCode).toEqual(204)
    }else{
        console.log("**PATCH TEST HAS BEEN SKIPED")
    }
})

it("DELETE '/profit/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .delete('/profit/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(204)
    }else{
        console.log("**DELETE TEST HAS BEEN SKIPED")
    }
})

})
  
