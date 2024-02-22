import express from 'express';
import routes from './routes/index.mjs';
import bodyParser from 'body-parser';

const app = express()

app.listen(3001, function(){
    console.log('server is running at port 3001.')
})

app.use(bodyParser.json());

app.use('/', routes)
