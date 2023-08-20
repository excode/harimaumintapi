const request = require('supertest')
const app = require('../server')
const userInfo = require('./userInfo')
describe('END-POINT referral', () => {
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
it("POST '/referral/'", async () => {
    const res = await request(app)
    .post('/referral')
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "email":"duis",
"amount":"1.35",
"status":"eiusmod"
    })
    expect(res.statusCode).toEqual(200)
    newID=res.statusCode==200?res.body["id"]:"";
    
})
it("POST '/referral/'", async () => {
    const res = await request(app)
    .post('/referral')
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "email":"veniam",
"amount":"1.35",
"status":"exercitation"
    })
    expect(res.statusCode).toEqual(200)
    newID=res.statusCode==200?res.body["id"]:"";
    
})
it("GET '/referral/'", async () => {
    const res = await request(app)
    .get('/referral?email=duis&amount=1.35&status=eiusmod')
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(200)
    
})

it("GET '/referral/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .get('/referral/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(200)
}else{
    console.log("**GET[ID] TEST HAS BEEN SKIPED")
}
    
})
it("PATCH '/referral/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .patch('/referral/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "email":"proident",
"amount":"1.35",
"status":"magna"
    })
    expect(res.statusCode).toEqual(204)
    }else{
        console.log("**PATCH TEST HAS BEEN SKIPED")
    }
})

it("DELETE '/referral/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .delete('/referral/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(204)
    }else{
        console.log("**DELETE TEST HAS BEEN SKIPED")
    }
})

})
  
