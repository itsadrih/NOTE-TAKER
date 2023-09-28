  const express = require('express');
 const router = express.Router(); 
 const fs = require('fs');

router.get('/', (req, res) => {
  readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading db.json:', err);
      res.status(500).json({ error: 'An error occurred while reading notes' });
      return;
    }

    const notes = JSON.parse(data);
    res.json(notes);
  });
});

router.post('/notes', (req, res) => {
  const newNote = {
    id: generateUniqueId(),
    title: req.body.title,
    text: req.body.text,
  };

  saveNoteToDB(newNote);
  res.json(newNote);
});


function generateUniqueId() {
  return Date.now().toString();
}


function saveNoteToDB(note) {
  readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading db.json:', err);
      return;
    }

    const notes = JSON.parse(data);
    notes.push(note);

    writeFile('db.json', JSON.stringify(notes, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error writing to db.json:', err);
      } else {
        console.log('Note saved to db.json');
      }
    });
  });
}

module.exports = router;