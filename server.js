const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const deleteAccount = require('./controllers/delete');

const db = knex({
    client: 'pg',
    connection: {
        connectionString : process.env.DATABASE_URL,
        host : process.env.DATABASE_HOST,
        port: process.env.DBPORT,
        user : process.env.DATABASE_USER,
        password : process.env.DATABASE_PASSWORD,
        database : process.env.DATABASE_DATABASE
    }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, resp) => {
    resp.send('success');
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db )})

app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.post('/facedetection', (req, res) => { image.handleFaceDetectionAPICall(req, res) })

app.post('/agedetection', (req, res) => { image.handleAgeDetectionAPICall(req, res) })

app.post('/ethnicitydetection', (req, res) => { image.handleEthnicityDetectionAPICall(req, res) })

app.delete('/deleteaccount', (req, res) => {deleteAccount.handleDelete(req, res, db) })



app.listen(process.env.PORT || 3001, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});