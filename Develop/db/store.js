const util = require("util");
const fs = require("fs"); 

const readFile = util.promisify(fs.readFile);

class Store {
    // functionality to read the information in db.json
    readFromDB() {
        return readFile("db/db.json", "utf8");
    }

    // functionality to write new notes to the db.json

    // functionality to get AllNotes from db.json and return them
    getAllNotes() {
        console.log("Checkpoint that the function to get notes hit");
        return this.readFromDB().then((notes) => {
            return JSON.parse(notes); 
        })
    }

    // functionality to add a new note to the db.json then call the getAllNotes above and return what comes back

    // functionality to delete a note from the db.json then call the getAllNotes above and return what comes back after deleting 1 note
}
module.exports = new Store(); 