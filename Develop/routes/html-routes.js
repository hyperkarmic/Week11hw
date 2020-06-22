//import dependencies
const path = require("path");

//routing 
module.exports = (app) => {

    //the two HTML get routes

    app.get("/notes/", (req,res) => {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });
    app.get("/",(req,res) => {
     res.sendFile(path.join(__dirname, "../public/index.html"));   
    });
};


