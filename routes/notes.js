const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request recieved for notes`);
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

// GET Route for a specific note
notes.get('/:note_id', (req, res) => {
    const noteID = req.params.note_id;
    readFromFile('./db/notes.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.note_id === noteID);
            return result.length > 0
                ? res.json(result)
                : res.json('No note with that ID');
        });
});

// DELETE Route for a specific note
notes.delete('/:note_id', (req, res) => {
    const noteId = req.params.tip_id;
    readFromFile('./db/notes.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.note_id !== noteId);
            writeToFile('./db/notes.json', result);
            res.json(`Item ${noteId} has been deleted`);
        });
});

// POST Route for a new note
notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            note_id: uuidv4(),
        };

        readAndAppend(newNote, './db/notes.json');
        res.json(`Tip added successfully 🚀`);
    } else {
        res.error('Error in adding note');
    }
});

module.exports = notes;