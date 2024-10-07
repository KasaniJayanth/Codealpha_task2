const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:3000/social-media', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(express.static('public'));

// Use routes
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});



// const express = require('express');
// const app = express();
// const port = 3000;

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });