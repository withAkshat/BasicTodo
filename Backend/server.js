const app = require("./src/app.js")
const connectToDb = require("./src/config/database.js")
const port = process.env.PORT || 3000;

connectToDb();

app.listen(port, (req, res)=>{
    console.log("server is started at 3000");
})