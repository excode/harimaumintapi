const request = require('supertest')
const app = require('../server')
const userInfo = require('./userInfo')
describe('END-POINT exchange', () => {
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
it("POST '/exchange/'", async () => {
    const res = await request(app)
    .post('/exchange')
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "sourcewallet":"incididunt",
"wallet":"estclf",
"amount":"1.35",
"comments":"Est id qui ex amet anim proident incididunt.",
"sourcewallettype":"elit",
"wallettype":"consectetur",
"status":"adclf"
    })
    expect(res.statusCode).toEqual(200)
    newID=res.statusCode==200?res.body["id"]:"";
    
})
it("POST '/exchange/'", async () => {
    const res = await request(app)
    .post('/exchange')
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "sourcewallet":"Lorem",
"wallet":"euclf",
"amount":"1.35",
"comments":"Elit eu sit sint reprehenderit mollit ut laboris qui irure ipsum occaecat pariatur nisi cillum.",
"sourcewallettype":"magna",
"wallettype":"estclf",
"status":"minim"
    })
    expect(res.statusCode).toEqual(200)
    newID=res.statusCode==200?res.body["id"]:"";
    
})
it("GET '/exchange/'", async () => {
    const res = await request(app)
    .get('/exchange?sourcewallet=incididunt&wallet=estclf&amount=1.35&comments=Est id qui&sourcewallettype=elit&wallettype=consectetu&status=adclf')
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(200)
    
})

it("GET '/exchange/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .get('/exchange/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(200)
}else{
    console.log("**GET[ID] TEST HAS BEEN SKIPED")
}
    
})
it("PATCH '/exchange/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .patch('/exchange/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "sourcewallet":"labore",
"wallet":"inclf",
"amount":"1.35",
"comments":"Aliquip velit laborum qui laboris.",
"sourcewallettype":"irure",
"wallettype":"exercitation",
"status":"proident"
    })
    expect(res.statusCode).toEqual(204)
    }else{
        console.log("**PATCH TEST HAS BEEN SKIPED")
    }
})

it("DELETE '/exchange/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .delete('/exchange/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(204)
    }else{
        console.log("**DELETE TEST HAS BEEN SKIPED")
    }
})

})
  
