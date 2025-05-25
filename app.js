const express = require('express');
const bodyParser = require('body-parser');
var app = express();
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

var items = [];
app.get('/', (req, res) => {
    res.render('list',{list:items});
});

app.post('/', (req, res) => {
    var item = (req.body.ele1);
    items.push(item);
    console.log(items);
    res.redirect('/');
});

app.post('/delete', (req, res) => {
    const taskIndex = parseInt(req.body.taskIndex);
    if (taskIndex >= 0 && taskIndex < items.length) {
        items.splice(taskIndex, 1);
        console.log('Deleted item. Remaining items:', items);
    }
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})