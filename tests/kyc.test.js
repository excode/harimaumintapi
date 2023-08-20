const request = require('supertest')
const app = require('../server')
const userInfo = require('./userInfo')
describe('END-POINT kyc', () => {
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
it("POST '/kyc/'", async () => {
    const res = await request(app)
    .post('/kyc')
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        
    })
    expect(res.statusCode).toEqual(200)
    newID=res.statusCode==200?res.body["id"]:"";
    
})
it("POST '/kyc/'", async () => {
    const res = await request(app)
    .post('/kyc')
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        
    })
    expect(res.statusCode).toEqual(200)
    newID=res.statusCode==200?res.body["id"]:"";
    
})
it("GET '/kyc/'", async () => {
    const res = await request(app)
    .get('/kyc?')
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(200)
    
})

it("GET '/kyc/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .get('/kyc/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(200)
}else{
    console.log("**GET[ID] TEST HAS BEEN SKIPED")
}
    
})
it("PATCH '/kyc/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .patch('/kyc/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        
    })
    expect(res.statusCode).toEqual(204)
    }else{
        console.log("**PATCH TEST HAS BEEN SKIPED")
    }
})

it("DELETE '/kyc/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .delete('/kyc/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(204)
    }else{
        console.log("**DELETE TEST HAS BEEN SKIPED")
    }
})

})
  
