module.exports = {
  name: "{{hook name provided from yo fortune:*** }}",
  init: function(options){
    return function(req, res){

      return this;
    }
  }
};
