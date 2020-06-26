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
    
};

const delNotes = async (req, res) => {
    
};

const grabNotesData = async () => {
    const notesFilePath = path.join(__dirname, "/db/db/.json")
    const notesData = await readFileAsync(notesFilePath, "ut8")
    const notesParsed = JSON.parse(notesData)
    return notesParsed

}











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
