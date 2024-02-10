const express = require('express')
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate')

app.set('view engine', 'ejs');
app.set(path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('ejs', ejsMate)

app.get('/', (req, res)=>{
    res.render('layout/home')
})


app.listen(9005, ()=>{
    console.log('Listening to port 9005.')
})