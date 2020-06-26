//grabbing dependency
const express = require("express");

//initializing instance
const app = express();

const PORT = process.env.PORT || 3000;

//middle-ware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set({
  "Access-Control-Allow-Origin": "*",
  "X-Content-Type-Options": "nosniff",
});

//promisify read/write file variables initialized
const readFileAsync = promisify(fs.readfile)
const writeFileAsync = promisify(fs.writefile)

//this is where the functions will be populated
//firstly html routes

const serveHome = (req, res) => {
    const filePath = path.join(__dirname, "/public/index.html")
    res.sendFile(filePath)
    
  };

  const serveNotes = (req, res) => {
    const filePath = path.join(__dirname, "/public/notes.html")
    res.sendFile(filePath)
    
};

//now the routes for the JS/CSS

const getJS = (req, res) => {
    const filePath = path.join(__dirname, "/public/assets/js/index.js")
    
};

const getCSS = (req, res) => {
    const filePath = path.join(__dirname, "/public/assets/css/styles.css")
};
//these are the API routes


//this function grabs Notes database - using grabNotesData function
const getNotes = async (req, res) => {
    const notes = await grabNotesData()
    res.json(notes)
    
};

const postNotes = async (req, res) => {
    const newNotes = req.body;
    const filePath = path.join(__dirname, "assets/db/db.json")
    const parsedNotesData = await grabNotesData()

    const genId = parsedNotesData.length + 1

    parsedNotesData.push({
        id: genId,
        title: newNotes.title,
        text: newNotes.text
    })

    await noteWriter(parsedNotesData)

    res.status(200).sendFile(filepath)

    
};

const delNotes = async (req, res) => {
    const filePath = path.join(__dirname, "public/notes.html")
    const dataBaseFilePath = path.join(__dirname, "/db/db.json")
    const notesData = await readFileAsync(dataBaseFilePath,"UTF8")
    const noteParse = JSON.parse(notesData)

    noteParse.splice(noteParse[req.params.id], 1);
    await writeFileAsync(dataBaseFilePath, JSON.stringify(noteParse), "UTF8")
    res.sendFile(filePath)
};

const grabNotesData = async () => {
    const notesFilePath = path.join(__dirname, "/db/db/.json")
    const notesData = await readFileAsync(notesFilePath, "ut8")
    const notesParsed = JSON.parse(notesData)
    return notesParsed

}

const noteWriter = async (parsedNotesData) => {
    const notesFilePath = path.join(__dirname, "/db/db.json");
     await writeFileAsync(notesFilePath, JSON.stringify(parsedNotesData))

};











//the routes are to be populated underneath


app.get("/", serveHome)
app.get("/notes", serveNotes)
//these constitute the html routes

app.get("/public", getJS)
app.get("/public", getCSS)
//these allow the accessing of necessary CSS/JS for the index page

//api routes for read/write/delete functionality

app.get("/api/notes",getNotes)
app.post("/api/notes",postNotes)
app.delete("/api/notes:id",delNotes)





app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
