const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');

const PORT = process.env.PORT || 3000;
const app = express();

app.set('views','./views');
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index', {data:''});
});

app.get('/position', (req, res) => {
    res.send({position: {'x': 0.2, 'y': 0.1, 'z': 0.2}});
});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
