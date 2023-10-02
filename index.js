const app = require("./app/app");
const { PORT } = require("./secret");
const connectDb = require("./src/config/db");

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log("database connected");
      console.log(`server is running http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("database is not connected");
    console.log("server is stop");
  });
