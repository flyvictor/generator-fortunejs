exports.resource = {
  name: "user",
  schema: {
    email: String,
    addresses: [
      {ref: "address", inverse: "user"}
    ]
  },
  options: {
    model: {pk: "email"}
  }
};
