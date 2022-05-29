const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
   });
   
app.get('/1', function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.get('/2', function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post('/api/posts', (req, res) => {
    console.log(req.body.posted_data.text);
    io.emit('news', req.body.posted_data.text);
   res.send(`${req.body.posted_data.text}`);  

});






//********************************** LOGIN ************************* */
const users = [
    { id: 1, name: "Rahim", password: "admin", isAdmin: true },
    { id: 2, name: "Hugo", password: "gohu",isAdmin: false },
];

app.post("/api/login", (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    const user = users.find((user)=> {
        return user.name === name && user.password === password;
    });
    if (user) {
        const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, "secret", { expiresIn: "30min" });

        res.json({
            name: user.name,
            isAdmin: user.isAdmin,
            token,
        });
    } else {
        res.status(400).json({ message: "user or password incorrect." });
    }
});

app.listen(5500, () => console.log("Backend server running on port 5500"));