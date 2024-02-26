import express from 'express';
import db from './config/db.mjs';
import routes from './routes/index.mjs';

const app = express()

db.connection.once('open', () => console.log('Connected to DB')).on("error", (err) => console.log("Error Connecting to DB -->", err))

app.listen(3001, function () {
    console.log('server is running at port 3001.')
})

app.use(express.json());

app.use('/', routes);
