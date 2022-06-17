let chai =require('chai');
let chaiHttp =require('chai-http');
let server=require('../index');

chai.should();

chai.use(chaiHttp);

describe('login Api',()=>{
    //test get route
    describe('POST /logging', ()=>{
        it('IT Should Be logging',(done)=>{
            chai.request(server)
             .post('/logging')
             .end((err,response)=>{
                 response.should.have.status(400);
                 response.body.should.be.a('object');
               //  response.body.should.have.property('email');
                
            done();
             })
        })
    })
})