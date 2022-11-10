const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes/cenflixRoutes");
const port = process.env.PORT || 4000;

const publicPath = path.join(__dirname, "/public");

app.set("view engine", "ejs");
app.use(express.static(publicPath));

app.use("/", routes);

app.listen(port, (err)=>{
    if(err) throw err;
    console.log(`Server Listening At Port ${port}`);
})