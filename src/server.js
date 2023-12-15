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
    host: "1jn.h.filess.io",
    user: "fithub_wasteable",
    password: "ikiPasswordDatabaseCapstoneTer",
    database: "fithub_wasteable",
    port: 3307
});

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({Error: "Not Authenticated"});
    }else{
        jwt.verify(token, "jwt-key", (err, decoded) => {
            if(err) return res.json({Error: "Not Correct Token"});
            req.username = decoded.username;
            req.userId = decoded.userId;
            next();
        })
    }
}

app.get('/', verifyUser, (req, res) => {
    return res.json({Status: "Success", userId: req.userId, data: req.username});
});

app.post('/register', (req,res) => {
    const sql = "INSERT INTO account (`username`, `email`, `password`) VALUES (?)";

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
    const sql = "SELECT id, username, password FROM account WHERE username = ?";
    db.query(sql, [req.body.username], (err, data) => {
        if(err) return res.json({Error: "Login error in server"});
        if(data.length > 0){
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if(err) return res.json({Error: "Password compare error"});
                if(response){
                    const userId = data[0].id;
                    const username = data[0].username;
                    const token = jwt.sign({userId, username}, "jwt-key", {expiresIn: '1d'});
                    res.cookie('token', token);
                    return res.json({Status: "Success"})
                } else {
                    return res.json({Error: "Wrong Password"});
                }
            })
        } else {
            return res.json({Error: "Username not registered"});
        }
    })
})

app.post('/save-calc', verifyUser, (req, res) => {
    const { date, age, weight, height, bmi, calories, bodyWeight } = req.body;

    const sql = "INSERT INTO result (`id_user`, `date`, `age`, `weight`, `height`, `bmi`, `calories`, `ideal_weight`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    const values = [
        req.userId, 
        date,
        age,
        weight,
        height,
        bmi,
        calories,
        bodyWeight
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error saving user data:", err);
            return res.json({ Error: "Error saving user data" });
        }
        return res.json({ Status: "Success" });
    });
});

app.get('/get-calc', verifyUser, (req, res) => {
    const userId = req.userId;

    const sql = "SELECT * FROM result WHERE user_id = ?";

    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error("Error fetching user data:", err);
            return res.json({ Error: "Error fetching user data" });
        }
        return res.json({ Status: "Success", userData: result });
    });
});


app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({Status: "Success"});
})

app.listen(8888, () => {
    console.log("Backend server is running!");
});