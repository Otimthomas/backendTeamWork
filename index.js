const express = require('express');
const users = require('./routes/users');
const articles = require('./routes/articles');

const app = express();

app.use(express.json());
app.use('/api/users', users);
app.use('/api/articles', articles);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})