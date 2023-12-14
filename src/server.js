const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const salt = 10;

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(cookieParser());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "fithub",
});

app.get('/', (req, res) => {
    res.send('Hello, this is the Fithub backend!');
});

app.post('/register', (req,res) => {
    const sql = "INSERT INTO login (`username`, `email`, `password`) VALUES (?)";

    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if(err) return res.json({Error: "Error hassing password"});
        const formData = [
            req.body.username,
            req.body.email,
            hash
        ]
        db.query(sql, [formData], (err, result) => {
            if(err) return res.json({Error: "Error registering user"});
            return res.json({Status: "Success"});
        })
    })
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE username = ?";
    db.query(sql, [req.body.username], (err, data) => {
        if(err) return res.json({Error: "Login error in server"});
        if(data.length > 0){
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if(err) return res.json({Error: "Password compare error"});
                if(response){
                    const username = data.username;
                    const token = jwt.sign({username}, "jwt-key", {expiresIn: '1d'});
                    res.cookie('token', token);
                    return res.json({Status: "Success"})
                }else{
                    return res.json({Error: "Wrong Password"});
                }
            })
        }else{
            return res.json({Error: "Username not registered"});
        }
    })
})

app.listen(8888, () => {
    console.log("Backend server is running!");
});
