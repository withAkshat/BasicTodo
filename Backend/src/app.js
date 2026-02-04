const express = require("express");
const app = express();
const notesModel = require("./models/note.model.js")
const cors = require("cors");
require('dotenv').config()
app.use(cors())
app.use(express.json());
app.use(express.static("./public"))

const path = require("path");
const { log } = require("console");

// read notes
app.get("/api/notes", async (req,res)=>{
    let allNotes = await notesModel.find();
    
    res.status(200).json({
        allNotes
    })
})

// create note!
app.post("/api/notes", async (req, res)=>{
    const { title, desc } = req.body;

    let notes = await notesModel.create(    {
        title, desc
    })

    res.status(201).json({
        message: "note created successfully!",
        notes
    })
})

// update note
app.patch("/api/notes/:id", async (req, res)=>{
    
    const {id} = req.params;
    const {desc, title} = req.body;

    let note = await notesModel.findByIdAndUpdate(id, { title:title, desc:desc});

     res.status(200).json({
        message: "note updated successfully!",
        note
    })

})


// delete note
app.delete("/api/notes/:id",async (req,res)=>{
    const {id} = req.params;
    
    let note = await notesModel.findByIdAndDelete(id);
    console.log(note);
    
    res.status(200).json({
        message:"note Deleted Sucessfully!",
        note
    })
})

// wild card!

app.use("*name",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","public","index.html"));
    
})


module.exports = app;