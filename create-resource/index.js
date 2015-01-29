'use strict';
var yeoman = require('yeoman-generator');
var path = require('path');

var config = {
  RESOURCES_DIR_NAME: "resources"
};

module.exports = yeoman.generators.Base.extend({

  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
    this.argument('resourceName', { type: String, required: false });
  },

  making_resources_directory: function () {
    this.mkdir(config.RESOURCES_DIR_NAME);
  },

  ask_name_of_resource: function () {
    if (this.resourceName != undefined) {
      return;
    }

    var done = this.async();

    var prompts = [
      {
        name: 'resourceName',
        message: 'Would you like to call your resource?' //TODO: need to add regex for names - no use of ! as this will be a dir
      }
    ];

    this.prompt(prompts, function (props) {
      this.resourceName = props.resourceName;
      done();
    }.bind(this));
  },

  create_resource_directory: function () {
    this.mkdir(
      path.join(config.RESOURCES_DIR_NAME, this.resourceName)
    );
  },

  create_resource: function () {
    this.fs.copyTpl(
      this.templatePath('_resources.js'),
      this.destinationPath(path.join(config.RESOURCES_DIR_NAME, this.resourceName, 'index.js'))
    );
  },

  create_hooks: function () {
    var hooksDir = path.join(config.RESOURCES_DIR_NAME, this.resourceName, 'hooks');

    //TODO make a func and in other hooks
    var hookName = 'beforeAll';
    this.fs.copyTpl(
      this.templatePath('hooks/_' + hookName + '.js'),
      this.destinationPath(path.join(hooksDir, hookName + '.js'))
    );
  },
});
