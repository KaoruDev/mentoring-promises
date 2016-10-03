var Model = function(fetch) {
  this.fetch = fetch;
};

Model.prototype.fetchSingleResource = function () {
  return this.fetch('/user');
};

module.exports = Model;
