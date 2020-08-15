const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const postsWithComments = {};

app.get('/posts', (req, res) => {
    res.send(postsWithComments);
})


app.post('/events', (req, res) => {
    const event = req.body;
    console.log(event);

    if (event.type == "PostCreate") {
        post = { "id": event.data.id, "content": event.data.title, "comments": [] };
        postsWithComments[event.data.id] = {post};
    }

    if (event.type == "CommentCreate") {
        comment = { "id": event.data.id, "comment": event.data.comment };
        postsWithComments[event.data.postId].post.comments.push(comment);
    }

    console.log(postsWithComments);



})

app.listen(4002, () => {
    console.log('query listening on port 4002');
})