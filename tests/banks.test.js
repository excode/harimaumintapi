const request = require('supertest')
const app = require('../server')
const userInfo = require('./userInfo')
describe('END-POINT banks', () => {
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
it("POST '/banks/'", async () => {
    const res = await request(app)
    .post('/banks')
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "bankname":"qui",
"swiftcode":"Lorem",
"bankaddress":"Occaecat culpa elit dolore esse consequat eiusmod mollit veniam.",
"city":"laborum",
"state":"doclf",
"postcode":"pariatur",
"accountname":"consectetur",
"accountnumber":"enim",
"document":"",
"active":"false"
    })
    expect(res.statusCode).toEqual(200)
    newID=res.statusCode==200?res.body["id"]:"";
    
})
it("POST '/banks/'", async () => {
    const res = await request(app)
    .post('/banks')
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "bankname":"idc",
"swiftcode":"eaclf",
"bankaddress":"Sit tempor eiusmod enim Lorem.",
"city":"occaecat",
"state":"laborum",
"postcode":"elit",
"accountname":"amet",
"accountnumber":"idclf",
"document":"",
"active":"false"
    })
    expect(res.statusCode).toEqual(200)
    newID=res.statusCode==200?res.body["id"]:"";
    
})
it("GET '/banks/'", async () => {
    const res = await request(app)
    .get('/banks?bankname=quis&swiftcode=Lorem&bankaddress=Occaecat c&city=laborum&state=doclf&postcode=pariatur&accountname=consectetu&accountnumber=enim&document=&active=false')
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(200)
    
})

it("GET '/banks/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .get('/banks/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(200)
}else{
    console.log("**GET[ID] TEST HAS BEEN SKIPED")
}
    
})
it("PATCH '/banks/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .patch('/banks/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send({
        "bankname":"Lor",
"swiftcode":"pariatur",
"bankaddress":"Cillum cupidatat et fugiat laborum dolor nostrud ut occaecat officia ut pariatur ipsum exercitation.",
"city":"euclf",
"state":"minim",
"postcode":"aliqua",
"accountname":"cillum",
"accountnumber":"consectetur",
"document":"",
"active":"false"
    })
    expect(res.statusCode).toEqual(204)
    }else{
        console.log("**PATCH TEST HAS BEEN SKIPED")
    }
})

it("DELETE '/banks/"+newID+"'", async () => {
    if(newID!=""){
    const res = await request(app)
    .delete('/banks/'+newID)
    .auth(auth.accessToken, { type: 'bearer' })
    .send()
    expect(res.statusCode).toEqual(204)
    }else{
        console.log("**DELETE TEST HAS BEEN SKIPED")
    }
})

})
  
