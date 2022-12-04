const express = require('express'); // express tells when, where, and how to express the information
const path = require('path'); // lets us make pathing in our file system
// const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001; // indicate what port we want to run on
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

app.use(express.static('public')); // serves static assets like HTML or CSS. Lets us have routes that are created for us because they're in the public folder

app.get('/', (req, res) => res.send('Navigate to /notes'));

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) => 
    {console.log(req.method)
    res.sendFile(path.join(__dirname, '/public/index.html'))
    }
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);