const express = require('express');
const bodyParser = require('body-parser')
const {randomBytes} = require('crypto')
const cors = require('cors');
const { default: axios } = require('axios');

const app = express();
app.use(bodyParser.json())
app.use(cors())

const thoughts = {};

app.get('/thoughts', (req, res) => {
    res.send(thoughts)
})

app.post('/thoughts',async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    thoughts[id] = {
        id, title
    }

    await axios.post('http://localhost:4005', {
        type: 'ThoughtCreated',
        data: {id, title}
    })

    res.status(201).send(thoughts[id])
})

app.post('/events', (req, res) => {
    console.log('Received Event', req.body.type);
    res.send({});
})

app.listen(4000, () => {
    console.log('Listening to 4000')
})