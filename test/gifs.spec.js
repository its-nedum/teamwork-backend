const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const {should, expect} = chai
const db = require('../database/dbcon')

chai.use(chaiHttp)

describe('GIF Route Testing', () => {
    describe("POST /gifs", () => {
        const gif = {
            title: 'My new gif',
            imageUrl: 'https://www.google.com/search?q=dancing',
            createdAt: '2019-11-01'
        }
        it("should create a new gif post", done => {
            chai.request(app)
              .post("/api/v1/gifs")
              .set('Accept', 'application/json')
              .send(gif)
              .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(200);
                expect(status).to.equal("success");
                expect(res.body.data).to.include({message:"GIF image successfully posted!"});
                expect(createdAt).to.be.a("string");
                expect(title).to.be.a("string");
                expect(imageUrl).to.be.a("string");
                done();
              });
          });
    })

    // employees can delete their gif
  describe("DELETE /gifs/<gifId>", () => {
    let gifId = 1;
    it("should delete a gif using ID", done => {
      chai.request(app)
        .delete(`/api/v1/gifs/${gifId}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(status).to.equal("success");
          expect(res.body.data).to.include({message:"Gif post successfully deleted"});
          done();
        });
    });
  });


    // Employees can comment on other colleagues' gif post
    describe("POST /gifs/<gifId>/comment", () => {
        let gifId =1;
        let comment = {
             comment: 'This is my first gif comment today',
             createdAt: '2019-11-01',
        }
        it("should add a comment to a gif", done => {
          chai.request(app)
            .post(`/api/v1/gifs/${gifId}/comment`)
            .set('Accept', 'application/json')
            .send(comment)
            .end((err, res) => {
              if (err) return done(err);
              expect(res.status).to.equal(201);
              expect(status).to.equal("success");
              expect(res.body.data).to.include({message:"Comment successfully created"});
              expect(createdAt).to.be.a("string");
              expect(comment).to.be.a("string");
              done();
            });
        });
      });
})