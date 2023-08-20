const request = require('supertest')
const app = require('../server')
const userInfo = require('./userInfo')
describe('END-POINT ewallets', () => {
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
it("POST '/ewallets/'", async () => {
    const res = await request(app)
    .post('/ewallets')
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "wallettype":"ipsum",
"balance":"1.35",
"hold":"1.35",
"status":"false",
"blocked":"false",
"name":"sitclf"
    })
    expect(res.statusCode).toEqual(200)
    newID=res.statusCode==200?res.body["id"]:"";
    
})
it("POST '/ewallets/'", async () => {
    const res = await request(app)
    .post('/ewallets')
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "wallettype":"deserunt",
"balance":"1.35",
"hold":"1.35",
"status":"false",
"blocked":"false",
"name":"enim"
    })
    expect(res.statusCode).toEqual(200)
    newID=res.statusCode==200?res.body["id"]:"";
    
})
it("GET '/ewallets/'", async () => {
    const res = await request(app)
    .get('/ewallets?wallettype=ipsum&balance=1.35&hold=1.35&status=false&blocked=false&name=sitclf')
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(200)
    
})

it("GET '/ewallets/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .get('/ewallets/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(200)
}else{
    console.log("**GET[ID] TEST HAS BEEN SKIPED")
}
    
})
it("PATCH '/ewallets/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .patch('/ewallets/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "wallettype":"adipisicing",
"balance":"1.35",
"hold":"1.35",
"status":"false",
"blocked":"false",
"name":"sunt"
    })
    expect(res.statusCode).toEqual(204)
    }else{
        console.log("**PATCH TEST HAS BEEN SKIPED")
    }
})

it("DELETE '/ewallets/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .delete('/ewallets/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(204)
    }else{
        console.log("**DELETE TEST HAS BEEN SKIPED")
    }
})

})
  
