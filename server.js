const express = require("express");
const app = express();



app.use(express.json());
app.use(express.urlencoded({
    extended : true
}));


// simple route
app.get("/", (req, res) => {
  res.json({ message: "this is a app to check air quality" });
});

require("./routes/position.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
