const request = require('supertest')
const app = require('../server')
const userInfo = require('./userInfo')
describe('END-POINT transfer', () => {
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
it("POST '/transfer/'", async () => {
    const res = await request(app)
    .post('/transfer')
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "amount":"1.35",
"wallettype":"minim",
"wallet":"incididunt",
"sourcewallet":"nisi",
"status":"dolore",
"comments":"Ipsum ut adipisicing eu velit reprehenderit ea nisi."
    })
    expect(res.statusCode).toEqual(200)
    newID=res.statusCode==200?res.body["id"]:"";
    
})
it("POST '/transfer/'", async () => {
    const res = await request(app)
    .post('/transfer')
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "amount":"1.35",
"wallettype":"officia",
"wallet":"anim",
"sourcewallet":"aliquip",
"status":"labore",
"comments":"Deserunt magna nostrud anim quis deserunt culpa duis eu dolore deserunt proident voluptate occaecat deserunt cupidatat."
    })
    expect(res.statusCode).toEqual(200)
    newID=res.statusCode==200?res.body["id"]:"";
    
})
it("GET '/transfer/'", async () => {
    const res = await request(app)
    .get('/transfer?amount=1.35&wallettype=minim&wallet=incididunt&sourcewallet=nisi&status=dolore&comments=Ipsum ut a')
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(200)
    
})

it("GET '/transfer/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .get('/transfer/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(200)
}else{
    console.log("**GET[ID] TEST HAS BEEN SKIPED")
}
    
})
it("PATCH '/transfer/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .patch('/transfer/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "amount":"1.35",
"wallettype":"dolore",
"wallet":"proident",
"sourcewallet":"laborum",
"status":"fugiat",
"comments":"Voluptate dolore consequat irure nulla magna dolor amet deserunt sit consequat amet."
    })
    expect(res.statusCode).toEqual(204)
    }else{
        console.log("**PATCH TEST HAS BEEN SKIPED")
    }
})

it("DELETE '/transfer/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .delete('/transfer/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(204)
    }else{
        console.log("**DELETE TEST HAS BEEN SKIPED")
    }
})

})
  
