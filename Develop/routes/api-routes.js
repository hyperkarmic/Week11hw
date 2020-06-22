const fs = require("fs");
const path = require("path")
const noteData = require("../db/db.json")

module.exports = function(app){

    app.get("/api.notes/", (req,res)=> {
        res.json(noteData)
    })
}