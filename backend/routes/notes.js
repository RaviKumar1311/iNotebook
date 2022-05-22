const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// Router 1 : Fetch all notes
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({user: req.user.id});
    res.send(notes);
  } catch (error) {
      res.status(500).send("Internal Server Error")
  }
});

// Router 2 : Add a new Note
router.post("/addnote", fetchUser,[
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({ min: 3}),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).send({ error: error.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.send(savedNote);
    } catch (error) {
        res.status(500).send("Internal Server Error")
        console.log(error)
    }
  }
);

// Route 3 : Update Note
router.put('/updatenote/:id', fetchUser, async(req,res)=>{
    const {title,description,tag} = req.body;
    try {
        
    const newNote = {};
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};

    let note =await Note.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not Found");
    }
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.send(note)
} catch (error) {
    res.status(500).send("Internal Server Error")
    console.log(error)
}
})

// Route 4 : Delete and existing Note
router.delete('/deletenote/:id',fetchUser,async(req,res)=>{
    try {
        let note = await Note.findById(req.params.id)
        if(!note){
            return res.status(404).send("Not Found")
        }
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.send({"Success":"Note has been deleted","Note":note})
    } catch (error) {
        res.status(500).send("Internal Server Error")
        console.log(error)
    }
})
module.exports = router;
