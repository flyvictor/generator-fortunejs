'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

//TODO make global
var config = {
  RESOURCES_DIR_NAME: "resources"
};


module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
    console.log('this is being exec');
  },

  copy_service_template: function () {
    this.fs.copyTpl(
      this.templatePath('_service.js'),
      this.destinationPath('service.js'),
      {
        defaultPort: 1337,
        RESOURCES_DIR_NAME: config.RESOURCES_DIR_NAME
      }
    );
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  },

  call_generator: function () {
    this.composeWith("fortunejs:create-resource");
  }
});
