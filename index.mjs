import express from 'express';
import db from './config/db.mjs';
import routes from './routes/index.mjs';
import { PORT } from './config/environment.mjs';

const app = express()

db.connection.once('open', () => console.log('Connected to DB')).on("error", (err) => console.log("Error Connecting to DB -->", err))

app.listen(PORT, function () {
    console.log(`server is running at port ${PORT}.`)
})

app.use(express.json());

app.use('/', routes);
