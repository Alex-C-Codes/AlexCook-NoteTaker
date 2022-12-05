const express = require('express'); // express tells when, where, and how to express the information
const path = require('path'); // lets us make pathing in our file system
const { clog } = require('./middleware/clog');
const api = require('./routes/index.js');
const notes = require('./routes/notes');

const PORT = process.env.PORT || 3001; // indicate what port we want to run on
const app = express();

// // Import custom middleware, 'clog'
// app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

// app.use('/', notes);

app.use(express.static('public')); // serves static assets like HTML or CSS. Lets us have routes that are created for us because they're in the public folder

// app.get('/', (req, res) => res.send('Navigate to /notes'));

// GET Route for notes page
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Wildcard GET Route for homepage. Gets any route that isn't /notes
app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);