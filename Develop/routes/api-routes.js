const fs = require("fs");
const path = require("path")
const noteData = require("../db/db.json")

module.exports = function(app){

    app.get("/api.notes/", (request,result)=> {
        result.json(noteData)
    })

    //implementation of post functionality

    app.post("./api/notes", (request,result) =>{
    
        console.log(noteData, "adding a new note", request.body);
        //console.logs incoming note
    
        //reading from the database
        fs.readFile("./db/db.json","utf8", (err, response) => {
            if (err) throw (err);
            //error handling

            let allNotes = JSON.parse(response)
            //the database - parsed as JSON
    
            let thisNote = allNotes[allNotes -1].id;
            //this gives use the number of entries
            thisNote = thisNote + 1;
            //plussed by one - we have our new iD
            console.log(thisNote)
    
            let newNote = {...request.body, id: latestNote };
            //creates object with new note text + unique iD
            console.log("New Note:", newNote)
           
            allNotes.push(newNote)
            //new note object pushed to the database
    
            fs.writefile("./db/db.json", JSON.stringify(allNotes), (err) =>{
                if (err) throw (err);
                //error handling
                result.json(allNotes);
                console.log("database has been updated with the new note", allNotes)
                //the jSon file has been re-written!
            })
        }
    })

    //implementation of delete functionality

    app.delete("/api/notes/:id",(request,result)=> {
     
        const noteId = request.params.id;
        //request note saved to variable
    
        (console.log("noteId: ", noteId))
        //note id console logged
    
        fs.readFile("./db/db.json", "utf8", (err, noteData)=> {
            if (err) throw err;
            //error handling
    
            const allNotes = JSON.parse(noteData)
            //response parsed to JSON
            const newAllNotes = allNotes.filter(note => note.id != noteId);
            //all notes that do not correspand to present note id filtered out
    
            fs.writeFile("./db/db.json",JSON.stringify(newAllNotes,null,2),err => {
                if (err) throw err;
                //error handling
                result.json(true);
                console.log("Note has been deleted!")
                //confirmation note has been deleted
            })
    
        })
    
    
    
    
    })
 


}