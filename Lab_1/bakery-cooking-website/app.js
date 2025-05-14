const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');

app.use(session({
    secret: 'yourSecretKey', 
    resave: false,
    saveUninitialized: true
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Home page
app.get('/', (req, res) => {
    if (!req.session.counter) {
        req.session.counter = 0;
    }
    if (!req.session.color) {
        req.session.color = 'black';
        req.session.bg = 'white';
    }
    res.render('home', {
        counter: req.session.counter,
        color: req.session.color,
        bg: req.session.bg
    });
});

// Counter Up
app.get('/up', (req, res) => {
    req.session.counter++;
    res.redirect('/');
});

// Counter Down
app.get('/down', (req, res) => {
    req.session.counter--;
    res.redirect('/');
});

// Change Style
app.get('/changeStyle', (req, res) => {
    const { color, bg } = req.query;
    if (color && bg) {
        req.session.color = color;
        req.session.bg = bg;
    }
    res.redirect('/');
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
