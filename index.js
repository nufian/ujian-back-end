const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const PORT = 1990;

var app = express();

app.use(cors());
app.use(bodyParser.json());

const conn = mysql.createConnection({
    host : 'localhost',
    user : 'Nufian',
    password : 'nickvalensi',
    database : 'moviebertasbih',
    port: 3306
});

app.get('/', (req,res) => {
    res.send('Ini Homepage')   
})

//Start Manage Movies
//Show data movie lists
app.get('/movielist' , (req,res) => {
    var sql = 'SELECT * from movies;'
    conn.query(sql ,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})

//Add data to movie lists
app.post('/addmovie',(req,res)=>{
    var addMovies = req.body
    var sql = `INSERT into movies SET ?`;
    conn.query(sql, addMovies,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})

//Edit data from movie lists
app.put('/editmovie/:id',(req,res)=>{
    var editMovies = req.body
    var sql = `UPDATE movies SET ? where id = '${req.params.id}'`;
    conn.query(sql, editMovies,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})

//Delete data from movie lists
app.delete('/deletemovie/:id', (req,res) => {
    var sql = `DELETE from movies WHERE id = '${req.params.id}'`;
    conn.query(sql,(err,result) => {
        res.send(result)
    })
})
//End Manage Movies

//Start Manage Category
//Show Category lists
app.get('/categorylists' , (req,res) => {
    var sql = 'SELECT * from categories;'
    conn.query(sql ,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})

//Add Category to lists
app.post('/addcategory',(req,res) => {
    var addCategories = req.body
    var sql = `INSERT into categories SET ?`;
    conn.query(sql, addCategories,(err,result) => {
        res.send(result)
        console.log(result)
    })
})

//Edit categories from lists
app.put('/editcategory/:id',(req,res) => {
    var editCategory = req.body
    var sql = `UPDATE categories SET ? WHERE id = '${req.params.id}'`;
    conn.query(sql, editCategory,(err,result) => {
        res.send(result)
        console.log(result)
    })
})

//Delete category from lists
app.delete('/deletecategory/:id',(req,res)=>{
    var sql = `DELETE from categories WHERE id = '${req.params.id}'`;
    conn.query(sql,(err,result) => {
        res.send(result)
        console.log(result)
    })
})
//End Manage Category


//Start Movcat Category
//Show Movcat lists
app.get('/movcatlist' , (req,res) => {
    var sql = `SELECT 
                movies.nama AS NamaMovies,
                categories.nama AS NamaCategories
                FROM categories
                JOIN movcat ON movcat.idcategory = categories.id
                JOIN movies ON movcat.idmovie = movies.id`;
    conn.query(sql, (err,result) => {
        res.send(result)
        console.log(result)
    })
})

//Add movcat to list
app.post('/addmovcat',(req,res) => {
    var { namaMovie, namaCategory } = req.body
    var sql = `INSERT INTO movcat VALUES
                (NULL, (SELECT id FROM movies WHERE nama = '${namaMovie}'), 
                (SELECT id FROM categories WHERE nama = '${namaCategory}'));`;
    conn.query(sql, (err,result) => {
        res.send(result)
        console.log(result)
    })
})

//Delete movcat from lists
app.delete('/deletemovcat/:id',(req,res) => {
    var { namaMovie, namaCategory } = req.body
    var sql = `DELETE movcat FROM movcat
        JOIN categories ON movcat.idcategory = categories.id
        JOIN movies ON movcat.idmovie = movies.id
        WHERE (movies.nama = '${namaMovie}') AND (categories.nama = '${namaCategory}');`;
    conn.query(sql, (err,result) => {
        res.send(result)
        console.log(result)
    })
})
//End Movcat Category

app.listen(PORT, () => console.log('API Aktif di port ' + PORT));