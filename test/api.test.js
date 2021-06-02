process.env.NODE_ENV = "test";
const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");
const should = chai.should();
const apiPrefix = "/api";
chai.use(chaiHttp);

describe("API Endpoints Test", () => {
  describe("Test Searching for Businesses", () => {
    it("Test for businesses with an entered address, a search term, and a default number of results.", (done) => {
      const sampleBody = {
        address: "1600 Amphitheatre Parkway, Mountain View, CA",
        term: "pizza",
      };
      chai
        .request(server)
        .post(apiPrefix + "/search")
        .send(sampleBody)
        .end((err, res) => {
          const { body } = res;
          const firstResult = body[0];
          res.should.have.status(200);
          body.should.be.a("array");
          body.length.should.be.eql(10);
          expect(firstResult.name).to.equals("Napoletana Pizzeria");
          expect(firstResult.id).to.equals("Ce5JgEwL7G3HwalAFBcZEQ");
          expect(firstResult.phone).to.equals("+16509694884");
          expect(firstResult.display_phone).to.equals("(650) 969-4884");
          done();
        });
    });
  });
});
