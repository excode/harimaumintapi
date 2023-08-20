const request = require('supertest')
const app = require('../server')
const userInfo = require('./userInfo')
describe('END-POINT history', () => {
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
it("POST '/history/'", async () => {
    const res = await request(app)
    .post('/history')
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "subject":"pariatur",
"comments":"Nisi ex adipisicing culpa nostrud exercitation id qui amet ea sunt sunt duis eiusmod minim.",
"status":"cillum"
    })
    expect(res.statusCode).toEqual(200)
    newID=res.statusCode==200?res.body["id"]:"";
    
})
it("POST '/history/'", async () => {
    const res = await request(app)
    .post('/history')
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "subject":"euclf",
"comments":"Eu sunt occaecat culpa anim ipsum minim pariatur nostrud sunt sit cupidatat.",
"status":"veniam"
    })
    expect(res.statusCode).toEqual(200)
    newID=res.statusCode==200?res.body["id"]:"";
    
})
it("GET '/history/'", async () => {
    const res = await request(app)
    .get('/history?subject=pariatur&comments=Nisi ex ad&status=cillum')
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(200)
    
})

it("GET '/history/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .get('/history/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(200)
}else{
    console.log("**GET[ID] TEST HAS BEEN SKIPED")
}
    
})
it("PATCH '/history/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .patch('/history/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "subject":"duis",
"comments":"Reprehenderit ipsum ipsum ullamco culpa enim occaecat non adipisicing irure laboris proident dolor aliqua adipisicing.",
"status":"adipisicing"
    })
    expect(res.statusCode).toEqual(204)
    }else{
        console.log("**PATCH TEST HAS BEEN SKIPED")
    }
})

it("DELETE '/history/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .delete('/history/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(204)
    }else{
        console.log("**DELETE TEST HAS BEEN SKIPED")
    }
})

})
  
