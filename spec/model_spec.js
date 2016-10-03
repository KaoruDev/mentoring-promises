var Model = require('../model.js');
var expect = require('chai').expect;
var database = {
};

describe('Model', () => {
  var model;

  beforeEach(() => {
    model = new Model(fetch);
  });

  describe('.fetchSingleResource', () => {
    it('will fetch the single resource', (done) => {
      database.user = { id: '2', name: 'frankie' };

      model.fetchSingleResource()
        .then(() => {
          expect(model.user).to.equal(database.user);
          done();
        })
        .catch(done);
    });
  });

  describe('.fetchDoubleResource', () => {
    it('will fetch two resources at the same time', (done) => {
      database.user = { id: '10', name: 'unikitty' };
      database.customer = { id: 'cust_10', name: 'train-tracks inc' };

      model.fetchDoubleResource()
        .then(() => {
          // found at '/user'
          expect(model.user).to.equal(database.user);
          // found at '/customer'
          expect(model.customer).to.equal(database.customer);
          done();
        })
        .catch(done);
    });
  });

  describe('.fetchSingleDependentResource', () => {
    it('will fetch the single resource', (done) => {
      var targetContent = { user_id: '20', body: 'in and out is da winna!' };

      database.user = { id: '20', name: 'unikitty' };
      database.content = [
        targetContent,
        { user_id: '21', body: 'foobar bar' },
      ];

      model.fetchSingleDependentResource()
        .then(() => {
          expect(model.user).to.equal(database.user);
          expect(model.content[0]).to.equal(targetContent);
          done();
        })
        .catch(done);
    });

    describe('when api returns an error', () => {
      it('handles error', (done) => {
      database.user = { id: '20', name: 'unikitty' };
      database.content = [{ user_id: '24', body: 'adsfafdsf' }];

        model.fetchSingleDependentResource()
          .then(() => {
            expect(model.errors).to.include('No content found.')
            done();
          })
          .catch(done);
      });
    });
  });
});

// private ================================

function fetch(path) {
  return new Promise((res, rej) => {
    var singleMatch = /^\/([a-z]+)$/;
    var associationMatch = /^\/([a-z]+)\/(\d+)\/([a-z]+)/;
    var associations = [];
    var associationName, resourceName, _totalMatch;

    if (path.match(singleMatch)) {
      res(database[path.match(singleMatch)[1]]);
    } else if (path.match(associationMatch)) {
      [_totalMatch, resourceName, resourceId, associationName] =
        path.match(associationMatch);

      for (let idx = 0; database[associationName].length > idx; idx ++) {
        let association = database[associationName][idx];
        if (association[`${resourceName}_id`] === resourceId) {
          associations.push(association);
        }
      }

      if (associations.length) {
        res(associations);
      }

      rej({ error: true, error_message: `No ${associationName} found.` });
    }

    rej({ error: true, error_message: 'Could not find resource' });
  });
}
