 const express = require('express');
  const router = express.Router(); 
 const fs = require('fs');
 const uniqid = require('uniqid'); 


router.post('/notes', (req, res) => {
    console.log('WORKS!');
    console.log('request to /api/notes has been received', req.body);
    const newNote = {
      id: generateUniqueId(),
      title: req.body.title,
      text: req.body.text,
    };
  
    saveNoteToDB(newNote);
    res.json(newNote);
  });
  
  // Function to generate a unique ID
function generateUniqueId() {
    return Date.now().toString();
  }
  


function saveNoteToDB(note) {
    console.log('note is being saved to db.json:', note);
  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error db.json:', err);
      return;
    }

    const notes = JSON.parse(data);
    notes.push(note);

    fs.writeFile('db.json', JSON.stringify(notes, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error while writing to db.json:', err);
      } else {
        console.log('Note has been saved to db.json');
      }
    });
  });
}

module.exports = router; // Export the Express router