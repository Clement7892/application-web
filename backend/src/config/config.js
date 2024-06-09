module.exports = {
  mongoURI: `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@application-web.vt8o0fe.mongodb.net/?retryWrites=true&w=majority`,
  secretOrKey: "secret",
};
