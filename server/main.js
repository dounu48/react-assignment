import express from 'express';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import api from './routes';

const app = express();
const port = 3000;

app.use('/', express.static(path.join(__dirname, './../public')));
app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/hello', (req, res) => {
    return res.send('Hello React');
});

app.listen(port, () => {
    console.log('Express is listening on port', port);
});

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server' ); });
// mongoose.connect('mongodb://localhost/test');
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });

app.use(session({
    secret: 'react$1$234',
    resave: false,
    saveUninitialized: true
}));

app.use('/api', api);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './../public/index.html'));
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
