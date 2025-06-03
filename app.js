const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
var app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

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

// Use DELETE method for delete operation
app.delete('/task/:index', (req, res) => {
    const taskIndex = parseInt(req.params.index);
    if (taskIndex >= 0 && taskIndex < items.length) {
        const deletedItem = items.splice(taskIndex, 1)[0];
        console.log('Deleted item:', deletedItem);
        console.log('Remaining items:', items);
    }
    res.redirect('/');
});

// Use PUT method for edit/update operation
app.put('/task/:index', (req, res) => {
    const taskIndex = parseInt(req.params.index);
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
    console.log('Make sure to install method-override: npm install method-override');
});
