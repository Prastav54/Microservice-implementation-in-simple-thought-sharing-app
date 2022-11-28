const express = require('express');
const bodyParser = require('body-parser')
const {randomBytes} = require('crypto')

const app = express();
app.use(bodyParser.json())

const thoughts = {};

app.get('/thoughts', (req, res) => {
    res.send(thoughts)
})

app.post('/thoughts', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    thoughts[id] = {
        id, title
    }

    res.status(201).send(thoughts[id])
})

app.listen(4000, () => {
    console.log('Listening to 4000')
})