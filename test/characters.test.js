var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("GET /api/characters", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should find all examples", function(done) {
    // Add some examples to the db to test with
    db.Character.bulkCreate([
      {
        name: "Super Hero",
        pic: "superpic.jpg",
        strength: 100,
        intelligence: 100,
        Skill: 100,
        votes: 100
      },
      {
        name: "Super Villain",
        pic: "superpic.jpg",
        strength: 100,
        intelligence: 100,
        skill: 100,
        votes: 100
      }
    ]).then(function() {
      // Request the route that returns all examples
      request.post("/api/characters").end(function(err, res) {
        // var superName = res.name;
        // var superPic = res.pic;
        // var superStrength = res.strength;
        // var superIntel = res.intelligence;
        // var superSkill = res.skill;
        // var superVotes = res.votes;
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("array")
          .that.has.lengthOf(2);

        expect(responseBody[0])
          .to.be.an("object")
          .that.includes({
            name: "Super Hero",
            pic: "superpic.jpg",
            strength: 100,
            intelligence: 100,
            Skill: 100,
            votes: 100
          });

        expect(responseBody[1])
          .to.be.an("object")
          .that.includes({
            name: "Super Villain",
            pic: "superpic.jpg",
            strength: 100,
            intelligence: 100,
            skill: 100,
            votes: 100
          });

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});
