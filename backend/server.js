const express = require('express');
const pool = require('./database');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 3000;

const app = express();

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
// We need to include "credentials: true" to allow cookies to be represented  
// Also "credentials: 'include'" need to be added in Fetch API in the Vue.js App

app.use(express.json()); // Parses incoming requests with JSON payloads and is based on body-parser.
app.use(cookieParser()); // Parse Cookie header and populate req.cookies with an object keyed by the cookie names.

const secret = "gdgdhdbcb770785rgdzqws"; // use a stronger secret
const maxAge = 60 * 60; //unlike cookies, the expiresIn in jwt token is calculated by seconds not milliseconds

const generateJWT = (id) => {
    return jwt.sign({ id }, secret, { expiresIn: maxAge })
        //jwt.sign(payload, secret, [options, callback]), and it returns the JWT as string
}

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});

// is used to check whether a user is authinticated
app.get('/auth/authenticate', async(req, res) => {
    console.log('authentication request has been arrived');
    const token = req.cookies.jwt; // assign the token named jwt to the token const
    //console.log("token " + token);
    let authenticated = false; // a user is not authenticated until proven the opposite
    try {
        if (token) { //checks if the token exists
            //jwt.verify(token, secretOrPublicKey, [options, callback]) verify a token
            await jwt.verify(token, secret, (err) => { //token exists, now we try to verify it
                if (err) { // not verified, redirect to login page
                    console.log(err.message);
                    console.log('token is not verified');
                    res.send({ "authenticated": authenticated }); // authenticated = false
                } else { // token exists and it is verified 
                    console.log('author is authinticated');
                    authenticated = true;
                    res.send({ "authenticated": authenticated }); // authenticated = true
                }
            })
        } else { //applies when the token does not exist
            console.log('author is not authinticated');
            res.send({ "authenticated": authenticated }); // authenticated = false
        }
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

// signup a user
app.post('/auth/signup', async(req, res) => {
    try {
        console.log("a signup request has arrived");
        //console.log(req.body);
        const { email, password } = req.body;

        const salt = await bcrypt.genSalt(); //  generates the salt, i.e., a random string
        const bcryptPassword = await bcrypt.hash(password, salt) // hash the password and the salt 
        const authUser = await pool.query( // insert the user and the hashed password into the database
            "INSERT INTO users(email, password) values ($1, $2) RETURNING*", [email, bcryptPassword]
        );
        console.log(authUser.rows[0].id);
        const token = await generateJWT(authUser.rows[0].id); // generates a JWT by taking the user id as an input (payload)
        //console.log(token);
        //res.cookie("isAuthorized", true, { maxAge: 1000 * 60, httpOnly: true });
        //res.cookie('jwt', token, { maxAge: 6000000, httpOnly: true });
        res.status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: authUser.rows[0].id })
            .send;
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});



app.post('/auth/login', async(req, res) => {
    try {
        console.log("a login request has arrived");
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) return res.status(401).json({ error: "User is not registered" });

        /* 
        To authenticate users, you will need to compare the password they provide with the one in the database. 
        bcrypt.compare() accepts the plain text password and the hash that you stored, along with a callback function. 
        That callback supplies an object containing any errors that occurred, and the overall result from the comparison. 
        If the password matches the hash, the result is true.

        bcrypt.compare method takes the first argument as a plain text and the second argument as a hash password. 
        If both are equal then it returns true else returns false.
        */

        //Checking if the password is correct
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        //console.log("validPassword:" + validPassword);
        if (!validPassword) return res.status(401).json({ error: "Incorrect password" });

        const token = await generateJWT(user.rows[0].id);
        res.status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: user.rows[0].id })
            .send;
    } catch (error) {
        res.status(400).send(err.message);
    }
});

//logout a user = deletes the jwt
app.get('/auth/logout', (req, res) => {
    console.log('delete jwt request arrived');
    res.status(202).clearCookie('jwt').json({ "Msg": "cookie cleared" }).send
});

// https://stackoverflow.com/a/10211214
//format: YYYY-MM-DD HH:MI:SS
const generateDateTime = () => {
    var currentdate = new Date(); 
    var datetime =    currentdate.getFullYear() + "-"
                    + (currentdate.getMonth()+1)  + "-" 
                    + currentdate.getDate() + " "
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
    return datetime;
}

// Posts: 
app.post('/posts/create', async(req, res) => {
    try {
        console.log("a post creating request has arrived");
        //console.log(req.body);
        const { body } = req.body;
        const addPost = await pool.query( // insert the user and the hashed password into the database
            "INSERT INTO posts (body, date) VALUES($1, $2) RETURNING*", [body, generateDateTime()]
        );
        console.log(addPost.rows[0].id);
        res.status(201)
            .json({post: addPost.rows[0], postAdded: true })
            .send;
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

app.post('/posts/delete/:id', async(req, res) => {
    try {
        console.log("a post deletion request has arrived");
        //console.log(req.body);
        const { id } = req.params;
        const deletePost = await pool.query( // insert the user and the hashed password into the database
            "DELETE FROM posts WHERE id=$1 RETURNING*", [id]
        );
        console.log(deletePost.rows[0].id);
        res.status(201)
            .json({ id: id, postRemoved: true })
            .send;
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

app.put('/posts/update/:id', async(req, res) => {
    try {
        console.log("a post update request has arrived");
        //console.log(req.body);
        const { id } = req.params;
        const { body } = req.body
        const updatePost = await pool.query( // insert the user and the hashed password into the database
            "UPDATE posts SET body=$2 WHERE id=$1 RETURNING*", [id, body]
        );
        console.log(updatePost.rows[0].id);
        res.status(201)
            .json({ id: id, body: body, postUpdated: true })
            .send;
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

app.post('/posts/delete', async(req, res) => {
    try {
        console.log("all posts deletion request has arrived");
        //console.log(req.body);
        const deleteAllPosts = await pool.query( // insert the user and the hashed password into the database
            "DELETE FROM posts WHERE 1=1 RETURNING*"
        );
        console.log(deleteAllPosts.rows[0].id);
        res.status(201)
            .json({ postsDeleted: true })
            .send;
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

app.get('/posts/get/:id', async(req, res) => {
    try {
        console.log("a post getting request has arrived");
        //console.log(req.body);
        const { id } = req.params;
        const getPost = await pool.query( // insert the user and the hashed password into the database
            "SELECT * FROM posts WHERE id=$1s", [id]
        );
        console.log(getPost.rows[0].id);
        res.status(201)
            .json({post: getPost.rows[0]})
            .send;
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

app.get('/posts/get', async(req, res) => {
    try {
        console.log("all posts getting request has arrived");
        const getPosts = await pool.query( // insert the user and the hashed password into the database
            "SELECT * FROM posts"
        );
        console.log(getPosts.rows[0].id);
        res.status(201)
            .json({posts: getPosts.rows})
            .send();
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});