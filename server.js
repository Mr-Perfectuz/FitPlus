const dotenv = require("dotenv");
dotenv.config();

const http = require("http");
const mongodb = require("mongodb");

let db;
const connectionString = process.env.MONGO_URL;

// mongodb.set("strictQuery", false);
// const connectionString = process.env.MONGO_URL;

mongodb.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) console.log("Error on connection MongoDb");
    else {
      console.log("MongoDB connection success");
      module.exports = client;

      const app = require("./app");
      const server = http.createServer(app);

      let PORT = process.env.PORT || 3005;
      server.listen(PORT, function () {
        console.log(
          `The server is running on port ${PORT}, http://localhost/${PORT}:`
        );
      });
    }
  }
);
