const express = require('express');
const bodyParser = require('body-parser');
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Added for JSON parsing
app.set('view engine', 'ejs');

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

var items = [];

app.get('/', (req, res) => {
    res.render('list', { list: items });
});

app.post('/', (req, res) => {
    var item = req.body.ele1;
    if (item && item.trim() !== '') {
        items.push(item.trim());
        console.log('Added item:', item.trim());
        console.log('Current items:', items);
    }
    res.redirect('/');
});

app.post('/delete', (req, res) => {
    const taskIndex = parseInt(req.body.taskIndex);
    if (taskIndex >= 0 && taskIndex < items.length) {
        const deletedItem = items.splice(taskIndex, 1)[0];
        console.log('Deleted item:', deletedItem);
        console.log('Remaining items:', items);
    }
    res.redirect('/');
});

// New edit route
app.post('/edit', (req, res) => {
    const taskIndex = parseInt(req.body.taskIndex);
    const newText = req.body.newText;
    
    if (taskIndex >= 0 && taskIndex < items.length && newText && newText.trim() !== '') {
        const oldItem = items[taskIndex];
        items[taskIndex] = newText.trim();
        console.log(`Edited item at index ${taskIndex}: "${oldItem}" -> "${newText.trim()}"`);
        console.log('Current items:', items);
    }
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
