var fs = require("fs");


var fortune = require('fortune');

/**
 * Example application. It implements an imageboard with boards & posts.
 * Note that this implementation does not include access control,
 * so it's more like a wiki but without the moderation.
 */
fortune({
  adapter: "mongodb",
  db: 'relationships_minimal'

});


var dir = "<%= RESOURCES_DIR_NAME %>";

fs.readdir(dir, function (err, list) {
  if (err) {
    return action(err);
  }

  list.forEach(function (resource) {
    path = dir + "/" + resource;
    fs.stat(path, function (err, stat) {
      if (stat && stat.isDirectory()) {
        var required = require(path);
        fortune.resource(
          required.resource.name,
          required.resource.schema,
          required.resource.options
        );

        list.forEach(function (hook) {
          path = dir + "/" + resource + "/" + hook;
          if (stat && stat.isFile()) {
            //TODO implement hook
          }
        });
      }
    });
  });
});

fortune.listen(process.argv[2] || <%= defaultPort %>);