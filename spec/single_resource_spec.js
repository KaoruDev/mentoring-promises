var Model = require('../my_model.js');
var expect = require('chai').expect;
var user;

describe('Model', () => {
  var model;

  beforeEach(() => {
    model = new Model(fetch);
  });

  describe('.fetchSingleResource', () => {
    it('will fetch the single resource', (done) => {
      user = { id: '2', name: 'frankie' };

      model.fetchSingleResource()
        .then(() => {
          expect(model.user).to.equal(user);
          done();
        })
        .catch(done);
    });
  });
});

// private ================================

function fetch(path) {
  return new Promise((res, rej) => {
    if (path.match(/\/user/)) {
      res(user);
    }

    rej({ error: true, error_message: 'Could not find resource' });
  });
}
