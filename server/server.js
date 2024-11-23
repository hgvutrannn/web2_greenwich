const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// make Vocab model globally accessible within the application
global.Vocab = require('./api/models/vocabModel');
const routes = require('./api/routes/vocabRoutes');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://hoangvutrannn:77pCHwjv1OwdqKuh@cluster1.7plzt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1', {
    useNewUrlParser: true
});

// The server will listen on the port specified by the environment variable PORT. If PORT is not defined, it defaults to 3000.
const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.listen(port);

app.use((req, res) => {
    res.status(404).send({ url: `${req.originalUrl} not found` });
});

console.log(`Server started on port ${port}`);
