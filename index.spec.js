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