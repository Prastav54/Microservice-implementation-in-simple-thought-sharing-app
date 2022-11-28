const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json);
app.use(cors());

const thoughts = {}

app.get('/thoughts', (req, res) => {
    res.send(thoughts)
})

app.post('/events', (req, res) => {
    const {type, data} = req.body;
    if (type === 'ThoughtsCreated'){
        const {id, title} = data;
        thoughts[id] = {id, title, comments: []}
    }
    if (type === 'CommentCreated'){
        const {id, content, postId} = data;
        const thought = thoughts[postId];
        thought.comments.push({id, content})
    }

    res.send({})
})

app.listen(4002, () => {
    console.log('Listening to 4002')
})