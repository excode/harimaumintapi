const request = require('supertest')
const app = require('../server')
const userInfo = require('./userInfo')
describe('END-POINT helpdesklog', () => {
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
it("POST '/helpdesklog/'", async () => {
    const res = await request(app)
    .post('/helpdesklog')
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "subject":"tempor",
"comments":"",
"documents":""
    })
    expect(res.statusCode).toEqual(200)
    newID=res.statusCode==200?res.body["id"]:"";
    
})
it("POST '/helpdesklog/'", async () => {
    const res = await request(app)
    .post('/helpdesklog')
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "subject":"cillum",
"comments":"",
"documents":""
    })
    expect(res.statusCode).toEqual(200)
    newID=res.statusCode==200?res.body["id"]:"";
    
})
it("GET '/helpdesklog/'", async () => {
    const res = await request(app)
    .get('/helpdesklog?subject=tempor&comments=&documents=')
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(200)
    
})

it("GET '/helpdesklog/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .get('/helpdesklog/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(200)
}else{
    console.log("**GET[ID] TEST HAS BEEN SKIPED")
}
    
})
it("PATCH '/helpdesklog/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .patch('/helpdesklog/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "subject":"amet",
"comments":"",
"documents":""
    })
    expect(res.statusCode).toEqual(204)
    }else{
        console.log("**PATCH TEST HAS BEEN SKIPED")
    }
})

it("DELETE '/helpdesklog/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .delete('/helpdesklog/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(204)
    }else{
        console.log("**DELETE TEST HAS BEEN SKIPED")
    }
})

})
  
