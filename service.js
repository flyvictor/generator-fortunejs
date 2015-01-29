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

})


//walk over files in resources folder
//for file add resource to fortune
//walk over hooks
//for hook in hooks add hook


  // Assert that it's a function
  // Read the directory
var dir = "resources";

fs.readdir(dir, function (err, list) {
  if (err) {
    return action(err);
  }

  list.forEach(function (file) {
    path = dir + "/" + file;
    fs.stat(path, function (err, stat) {
      if (stat && stat.isFile()) {
        var required = require(path);
        fortune.resource(
          required.resource.name,
          required.resource.schema,
          required.resource.options
        );
      }
    });
  });
})


/*!
 * Define resources
 */
  .
  resource("user", {
    email: String,
    addresses: [
      {ref: "address", inverse: "user"}
    ]
  }, {
    model: {pk: "email"}
  })

    .resource("address", {
      user: {ref: "user", inverse: "addresses", pkType: String}
    })

    /*!
     * Start the API
     */
    .listen(process.argv[2] || 1337);