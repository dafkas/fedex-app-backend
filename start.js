const mongoose = require("mongoose");
const app = require("./app");

require("dotenv").config({ path: "variables.env" });

mongoose.connect(process.env.DATABASE, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;
mongoose.connection.on("error", err => {
  console.error(`Error→ ${err.message}`);
});

app.set("port", process.env.PORT);

const server = app.listen(app.get("port"), () => {
  console.log(`Express running on PORT ${server.address().port}`);
});
