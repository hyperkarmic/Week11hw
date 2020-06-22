const fs = require("fs");
const path = require("path")
const noteData = require("../db/db.json")

module.exports = function(app){

    app.get("/api.notes/", (req,res)=> {
        res.json(noteData)
    })

    //implementation of post functionality

    app.post("/api.notes",(req.res)=>{

    })

    //implementation of delete functionality

    app.delete("/api.notes/:id",(req,res)=>{

    })
 


}