var Model = function(fetch) {
  this.fetch = fetch;
};

Model.prototype.fetchSingleResource = function () {
  return this.fetch('/user');
};

Model.prototype.fetchDoubleResource = function () {
  return this.fetch('/user');
};

Model.prototype.fetchSingleDependentResource = function () {
  return this.fetch('/user');
};

module.exports = Model;
