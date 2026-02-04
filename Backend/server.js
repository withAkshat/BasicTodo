const app = require("./src/app.js")
const connectToDb = require("./src/config/database.js")

connectToDb();

app.listen(3000, (req, res)=>{
    console.log("server is started at 3000");
})