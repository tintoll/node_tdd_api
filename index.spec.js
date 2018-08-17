const assert = require('assert');
const should = require('should');
const request = require('supertest');
const app = require('./index');


describe('GET /users', () => {

  describe('성공' , () => {
    it('배열을 반환한다.', (done) => {
      // assert.equal(1,1)
      // (1).should.equal(1)
  
      request(app)
        .get('/users')
        .end((err, res) => {
          //console.log(res.body)
          res.body.should.be.instanceof(Array)
          done() //테스트 종료되었다. 비동기이때문에 종료를 알수 없어서 
        })
    })

    it('limit개수만큼 반환한다.', (done) => {
      request(app)
          .get('/users?limit=2')
          .end( (err, res)=> {
            res.body.should.have.lengthOf(2)
            done()
          })
    })

  })
  
  describe('실패' , () => {
    it('limit 정수형이아니면 400반환', (done) => {
      request(app)
          .get('/users?limit=two')
          .expect(400)
          .end(done)
    })
  })
})

describe('GET /users/:id' , () =>{
  describe('성공', () => {
    it('유저 객체를 반환한다.', done => {
      request(app)
        .get('/users/1')
        .end( (err, res) => {
          res.body.should.have.property('id',1)
          done()
        })
    })    
  })
  describe('실패', () => {
    it('id가 숫자가 아닐경우 400', done => {
      request(app)
        .get('/users/one')
        .expect(400).end(done)
    })
    it("id로 유저를 찾을수 없을경우 404", done => {
      request(app)
        .get('/users/5')
        .expect(404).end(done)
    });
  })
})


describe('DELETE /users/:id', () => {
  describe('성공', () => {
    it('204를 응답한다.', done => {
       request(app)
        .delete('/users/2')
        .expect(204).end(done);
    })
  })
  describe('실패', () => {
    it('id가 숫자가 아닐경우 400', done => {
      request(app)
        .delete('/users/two')
        .expect(400).end(done)
    })
  })
})


describe('POST /users', () => {
  describe('성공', () => {    
    it("객체반환", done => {
      request(app)
        .post("/users")
        .send({ name : "nananan" })
        .expect(201)
        .end((err, res) => {
          //res.body.should.be.instanceof(Object);
          res.body.should.have.property('name','nananan');
          done();
        });
    });
  })
  describe("실패", () => {
    it('name 파라미터 누락시 400반환', done => {
      request(app)
        .post('/users')
        .send({})
        .expect(400).end(done)
    })
    it('name 중복시 409반환', done => {
      request(app)
        .post('/users')
        .send({ name: 'Allis'})
        .expect(409).end(done)
    })
  });
})

describe('PUT /users/:id', () =>{
  describe('성공', () => {
    it('변경된 name을 응답한다.', done => {
      request(app)
        .put("/users/1")
        .send({ name: "modify" })
        .expect(200)
        .end((err, res) => {          
          res.body.should.have.property('name', "modify");
          done();
        });
    })
  })
  describe('실패', () => {
    it("id가 정수가아닐경우 400반환", done => {
      request(app)
        .put("/users/one")        
        .expect(400)
        .end(done);
    });
    it('name 파라미터 누락시 400반환', done => {
      request(app)
        .put('/users/1')
        .send({})
        .expect(400).end(done)
    })
    it("없는유저일경우 404반환", done => {
      request(app)
        .put("/users/5")
        .send({name : 'aa'})
        .expect(404)
        .end(done);
    });
    it('name 중복시 409반환', done => {
      request(app)
        .put('/users/1')
        .send({ name: 'Tom' })
        .expect(409).end(done)
    })
  })
})