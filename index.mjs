import express from 'express';
import routes from './routes/index.mjs';
import db from './config/db.mjs';

const app = express()

db.connection.once('open', () => console.log('Connected to DB'))

app.listen(3001, function () {
    console.log('server is running at port 3001.')
})

app.use(express.json());

app.use('/', routes)
