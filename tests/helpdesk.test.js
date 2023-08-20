const request = require('supertest')
const app = require('../server')
const userInfo = require('./userInfo')
describe('END-POINT helpdesk', () => {
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
it("POST '/helpdesk/'", async () => {
    const res = await request(app)
    .post('/helpdesk')
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "subject":"adclf",
"details":"Cillum magna cillum elit esse minim commodo consectetur officia ad dolore cupidatat excepteur consectetur duis.",
"document":""
    })
    expect(res.statusCode).toEqual(200)
    newID=res.statusCode==200?res.body["id"]:"";
    
})
it("POST '/helpdesk/'", async () => {
    const res = await request(app)
    .post('/helpdesk')
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "subject":"exclf",
"details":"Veniam cupidatat esse magna occaecat irure aliquip nostrud magna ut qui officia pariatur qui in Lorem.",
"document":""
    })
    expect(res.statusCode).toEqual(200)
    newID=res.statusCode==200?res.body["id"]:"";
    
})
it("GET '/helpdesk/'", async () => {
    const res = await request(app)
    .get('/helpdesk?subject=adclf&details=Cillum mag&document=')
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(200)
    
})

it("GET '/helpdesk/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .get('/helpdesk/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(200)
}else{
    console.log("**GET[ID] TEST HAS BEEN SKIPED")
}
    
})
it("PATCH '/helpdesk/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .patch('/helpdesk/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "subject":"laborum",
"details":"Aliqua minim ut nulla ad sint laboris fugiat ad amet irure dolor aute.",
"document":""
    })
    expect(res.statusCode).toEqual(204)
    }else{
        console.log("**PATCH TEST HAS BEEN SKIPED")
    }
})

it("DELETE '/helpdesk/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .delete('/helpdesk/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(204)
    }else{
        console.log("**DELETE TEST HAS BEEN SKIPED")
    }
})

})
  
