const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
const config = require("./config/dev");
const Rental = require("./models/rental");
const FakeDb = require("./fake-db");

const rentalRoutes = require("./routes/rentals");

mongoose.Promise = global.Promise;

mongoose
  .connect(
    config.DB_URI,
    { useNewUrlParser: true }
  )
  .then(() => {
    const fakeDb = new FakeDb();
    fakeDb.seedDb();
  });

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/api/v1/rentals", rentalRoutes);

app.listen(PORT, () => {
  console.log("I am running");
});

// app.get("/rentals", (req, res) => {
//   res.json({ sucess: true });
// });
