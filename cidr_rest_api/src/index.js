import express from 'express';
import cors from 'cors';
import routes from './routes';

import models from './models';


/**
 * WE are using Express framework to build a Rest API
 * we setup the default data with the List models
 * and we call the routes.ipv4 that manage all the request for this part of the app
 */

const app = express();
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req,res,next)=>{
    req.context = { list:models.list.get() };
    next();
});

app.use('/ipv4',routes.ipv4);

app.listen(5000, () => console.log('Example app listening on port 5000!'));
